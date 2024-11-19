import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { ParseDatePipe } from 'src/common/pipes/parse-date.pipe';
import { UserRoleGuard } from 'src/auth/guards/user-role.guard';

@Controller('feedback')
@Auth()
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post(':id')
  create(
    @Param('id', ParseUUIDPipe) formId,
    @Body() createFeedbackDto: CreateFeedbackDto,
    @GetUser() user: User,
  ) {
    return this.feedbackService.create(createFeedbackDto, user, formId);
  }

  @Get('form/:formId')
  findByForm(@Param('formId', ParseUUIDPipe) formId: string) {
    return this.feedbackService.findByFormId(formId);
  }

  @Get('user/:userId')
  findByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.feedbackService.findByUserId(userId);
  }

  @Get('by-date-range')
  findByDateRange(
    @Query('startDate', ParseDatePipe) startDate: Date,
    @Query('endDate', ParseDatePipe) endDate: Date,
  ) {
    return this.feedbackService.findByDateRange(startDate, endDate);
  }

  @Get('satisfaction/:rating')
  findBySatisfaction(@Param('rating', ParseIntPipe) rating: number) {
    return this.feedbackService.findBySatisfaction(rating);
  }

  @Get('search')
  search(@Query('query') query: string) {
    return this.feedbackService.searchFeedback(query);
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: string) {
    return this.feedbackService.findByStatus(status);
  }
}
