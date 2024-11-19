import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Between, Repository } from 'typeorm';
import { FormQuestion } from 'src/forms/entities';
import { QuestionType } from 'src/forms/interfaces';

@Injectable()
export class AnswersService {

  private readonly logger = new Logger('FormsService');

  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,

    @InjectRepository(FormQuestion)
    private readonly questionRepository: Repository<FormQuestion>,
  ) { }

  async create(questionId: string, createAnswerDto: CreateAnswerDto, user: User) {
    try {
      const question = await this.questionRepository.findOneBy({ id: questionId });

      if (!question) throw new NotFoundException(`Question with id ${questionId} not found`);

      if (question.type !== QuestionType.OpenEnded) {
        const { responses } = createAnswerDto;

        const allResponsesValid = responses.every(response =>
          question.options.includes(response)
        );

        if (!allResponsesValid) {
          throw new BadRequestException('One or more answers are not valid options');
        }
      }


      const answer = this.answerRepository.create({
        ...createAnswerDto,
        question,
        userId: user.id,
      });

      return this.answerRepository.save(answer);
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  async findByUserAndQuestion(userId: string, questionId: string): Promise<Answer[]> {
    return await this.answerRepository.find({
      where: {
        userId: userId,
        question: { id: questionId }
      }
    });
  }


  async findByQuestionId(questionId: string) {
    return await this.answerRepository.find({
      where: { question: { id: questionId } },
    });
  }

  async findByUserId(userId: string) {
    return await this.answerRepository.find({
      where: { userId },
    });
  }

  async findByDateRange(startDate: Date, endDate: Date) {
    return await this.answerRepository.find({
      where: {
        answeredAt: Between(startDate, endDate),
      },
    });
  }

  async findOne(id: string) {

    let answer: Answer;
    answer = await this.answerRepository.findOneBy({ id: id });

    if (!answer)
      throw new NotFoundException(`form with ${id} not found`);

    return answer;
  }

  async remove(id: string) {
    const form = await this.findOne(id);
    await this.answerRepository.remove(form);
  }

  async removeAll() {
    const query = this.answerRepository.createQueryBuilder('form');

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
