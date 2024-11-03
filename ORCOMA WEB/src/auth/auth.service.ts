import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt'

import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';
import { JwtService } from '@nestjs/jwt';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService
  ){}
  
  async createUser(createUserDto: CreateUserDto) {
    
    try{

      const {password, ...userData} = createUserDto

      const user = this.userRepository.create( {
        ...userData,
        password: bcrypt.hashSync(password, 10)
      })

      await this.userRepository.save( user )

      return {
        ...user, 
        token: this.getJwtToken({id: user.id})
      }
      
    } catch (error){
      this.handleDBExceptions(error)
    }
  }

  async loginUser( loginUserDto: LoginUserDto){

      const { password, email } = loginUserDto

      const user = await this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true, id: true}
      })

      if ( !user )
        throw new UnauthorizedException('Unvalid credentials')

      if ( !bcrypt.compareSync(password, user.password) )
        throw new UnauthorizedException('Unvalid credentials')

      return {
        ...user, 
        token: this.getJwtToken({id: user.id})
      }
  }

  async findAll(paginationDto: PaginationDto) {

    const { limit = undefined, offset = 0 } = paginationDto;

    const feedbacks = await this.userRepository.find({
      take: limit,
      skip: offset
    })

    return feedbacks
  }

  private getJwtToken( payload: JwtPayload){

    const token = this.jwtService.sign( payload )
    return token

  }

  private handleDBExceptions( error: any ): never{

    if (error.code === '23505')
      throw new BadRequestException( error.detail)

    console.log(error)

    throw new InternalServerErrorException('Unexpected error. Please check server logs')
  }
}
