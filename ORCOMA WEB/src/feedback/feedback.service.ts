import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { Between, Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { FormsService } from 'src/forms/forms.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class FeedbackService {

  private readonly logger = new Logger('FeedbackService');

  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,

    private readonly formsService: FormsService,
  ) { }

  async create(createFeedbackDto: CreateFeedbackDto, user: User, formId: string) {

    try {

      await this.formsService.findOne(formId)

      const feedback = this.feedbackRepository.create({
        ...createFeedbackDto,
        userId: user.id,
        formId
      });
      return await this.feedbackRepository.save(feedback);

    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  async findAll(paginationDto: PaginationDto) {

    const { limit = undefined, offset = 0 } = paginationDto;

    const feedbacks = await this.feedbackRepository.find({
      take: limit,
      skip: offset
    })

    return feedbacks
  }

  async findByFormId(formId: string) {
    return await this.feedbackRepository.find({ where: { formId } });
  }

  async findByUserId(userId: string) {
    return await this.feedbackRepository.find({ where: { userId } });
  }

  async findByDateRange(startDate: Date, endDate: Date) {
    return await this.feedbackRepository.find({
      where: {
        createdAt: Between(startDate, endDate)
      },
    });
  }

  async findBySatisfaction(rating: number) {
    return await this.feedbackRepository.find({ where: { rating } });
  }

  async searchFeedback(query: string) {
    return await this.feedbackRepository
      .createQueryBuilder('feedback')
      .where('feedback.message ILIKE :query', { query: `%${query}%` })
      .getMany();
  }

  async findByStatus(status: string) {
    return await this.feedbackRepository.find({ where: { status } });
  }

  private handleDBExceptions(error: any) {

    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
