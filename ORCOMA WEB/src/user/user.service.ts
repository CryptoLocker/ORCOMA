import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isNumber, isUUID } from 'class-validator';

@Injectable()
export class UserService {

  private readonly logger = new Logger('ProductsService')
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>

  ) { }

  async create(createUserDto: CreateUserDto) {

    try {

      const user = this.userRepository.create(createUserDto)
      await this.userRepository.save(user)

      return user
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 20, offset = 0 } = paginationDto
    return this.userRepository.find({
      take: limit,
      skip: offset
    })
  }

  async findOne(term: string) {
    let user: User

    if (isUUID(term)) {
      user = await this.userRepository.findOneBy({ id: term })
    } else {
      try {
        const id = parseInt(term)
        user = await this.userRepository.findOneBy({ docId: id })
      } catch { }

    }

    if (!user)
      throw new NotFoundException(`Product with ${term} not found`)

    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto
    })

    if (!user) throw new NotFoundException(`Product with id: ${id} not found`)

    try {
      await this.userRepository.save(user)
    } catch (error) {
      this.handleDBExceptions(error)
    }

    return user
  }

  async remove(id: string) {

    const user = await this.findOne(id)

    await this.userRepository.remove(user)
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail)

    this.logger.error(error)
    throw new InternalServerErrorException("Unexpected error, check server logs")
  }
}
