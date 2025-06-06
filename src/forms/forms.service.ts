import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { User } from 'src/auth/entities/user.entity';
import { Form, FormQuestion } from './entities';
import { DataSource, In, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { FormVideo } from './entities/form-video.entity';
import { CreateFormVideoDto } from './dto';
import { ValidRoles } from 'src/auth/interfaces';


@Injectable()
export class FormsService {

  private readonly logger = new Logger('FormsService');

  constructor(

    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>,

    @InjectRepository(FormQuestion)
    private readonly questionRepository: Repository<FormQuestion>,

    @InjectRepository(FormVideo)
    private readonly videoRepository: Repository<FormVideo>,

    private readonly dataSource: DataSource,
  ) { }

  async create(createFormDto: CreateFormDto, user: User) {
    try {

      const form = this.formRepository.create({
        authorId: user.id,
        ...createFormDto,
      })
      return await this.formRepository.save(form)
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  async findAll(paginationDto: PaginationDto) {

    const { limit = undefined, offset = 0 } = paginationDto;

    const forms = await this.formRepository.find({
      take: limit,
      skip: offset,
      relations: {
        questions: true,
      }
    })

    return forms.map((form) => ({
      ...form,
      questions: form.questions
    }))

  }

  async findOne(id: string) {

    let form: Form;
    form = await this.formRepository.findOneBy({ id: id });

    if (!form)
      throw new NotFoundException(`Form with ${id} not found`);

    return form;
  }

  async update(id: string, updateProductDto: UpdateFormDto, user: User) {

    const { questions, ...toUpdate } = updateProductDto;


    const form = await this.formRepository.preload({ id, ...toUpdate });

    if (!form) throw new NotFoundException(`Form with id: ${id} not found`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      if (questions) {
        await queryRunner.manager.delete(FormQuestion, { form: { id } });

        form.questions = questions.map(
          question => this.questionRepository.create({ ...question, form })
        )
      }

      form.authorId = user.id

      await queryRunner.manager.save(form);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOne(id);

    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }

  }

  async updateFormVideo(id: string, filePath: string, createFormVideoDto: CreateFormVideoDto) {
    const form = await this.findOne(id);

    if (!form) throw new NotFoundException(`Form with id: ${id} not found`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      //Remove previous video if existent
      await queryRunner.manager.delete(FormVideo, { form: { id } });

      form.video = this.videoRepository.create({
        ...createFormVideoDto,
        path: filePath,
        form: form
      })

      await queryRunner.manager.save(Form, form);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOne(id);

    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const form = await this.findOne(id);
    await this.formRepository.remove(form);
  }

  async removeAll() {
    const query = this.formRepository.createQueryBuilder('form');

    try {
      return await query
        .delete()
        .where({})
        .execute();

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {

    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
