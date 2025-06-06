import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from 'src/answers/entities/answer.entity';
import { User } from 'src/auth/entities/user.entity';
import { Form } from 'src/forms/entities/form.entity';
import { FormQuestion } from 'src/forms/entities/form-question.entity';
import { UserStatsFilterDto } from 'src/common/dtos/user-stats-filter.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>,
    @InjectRepository(FormQuestion)
    private readonly questionRepository: Repository<FormQuestion>,
  ) { }

  private readonly logger = new Logger('ReportsService');

  async getUserEvaluations(
    filters: UserStatsFilterDto,
    paginationDto: PaginationDto
  ) {

    const { offset = 0, limit = 10 } = paginationDto;

    try {

      const query = this.answerRepository.createQueryBuilder('answer')
        .leftJoinAndSelect('answer.question', 'question')
        .leftJoinAndSelect('question.form', 'form')
        .leftJoinAndSelect('answer.user', 'user');

      this.applyFilters(query, filters);

      query.skip(offset).take(limit);
      query.select([
        'answer.id',
        'answer.answeredAt',
        'user.id',
        'user.fullName',
        'form.id',
        'form.title',
        'form.targetRoles',
        'question.id',
        'question.text',
      ]);

      const [results, total] = await query.getManyAndCount();
      return {
        total,
        results,
      };

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private applyFilters(query: any, filters: UserStatsFilterDto) {
    if (filters.role) {
      query.andWhere(':role = ANY(form.targetRoles)', { role: filters.role });
    }
    if (filters.dateFrom) {
      query.andWhere('answer.answeredAt >= :dateFrom', { dateFrom: filters.dateFrom });
    }
    if (filters.dateTo) {
      query.andWhere('answer.answeredAt <= :dateTo', { dateTo: filters.dateTo });
    }
    if (filters.userName) {
      query.andWhere('user.fullName ILIKE :userName', { userName: `%${filters.userName}%` });
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
