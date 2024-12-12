import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { ParseDatePipe } from 'src/common/pipes/parse-date.pipe';
import { UserRoleGuard } from 'src/auth/guards/user-role.guard';
import { ApiOperation, ApiParam, ApiBody, ApiResponse, ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Feedback } from './entities/feedback.entity';

@ApiTags('Feedback')
@ApiBearerAuth()
@Controller('feedback')
@Auth()
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('answer/:answerId')
  @ApiOperation({ summary: 'Create feedback for an answer' })
  @ApiParam({ name: 'answerId', description: 'Answer ID', type: 'string', format: 'uuid' })
  @ApiBody({ type: CreateFeedbackDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Feedback created successfully',
    type: Feedback 
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Answer not found' })
  create(
    @Param('answerId', ParseUUIDPipe) answerId: string,
    @Body() createFeedbackDto: CreateFeedbackDto,
  ) {
    return this.feedbackService.create(createFeedbackDto, answerId);
  }

  @Get('by-date-range')
  @ApiOperation({ summary: 'Get feedback within a date range' })
  @ApiQuery({ name: 'startDate', description: 'Start date (YYYY-MM-DD)', type: 'string' })
  @ApiQuery({ name: 'endDate', description: 'End date (YYYY-MM-DD)', type: 'string' })
  @ApiResponse({ status: 200, description: 'Returns feedback within the date range', type: [Feedback] })
  @ApiResponse({ status: 400, description: 'Invalid date format' })
  findByDateRange(
    @Query('startDate', ParseDatePipe) startDate: Date,
    @Query('endDate', ParseDatePipe) endDate: Date,
  ) {
    return this.feedbackService.findByDateRange(startDate, endDate);
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Get feedback by status' })
  @ApiParam({ name: 'status', description: 'Feedback status', type: 'string' })
  @ApiResponse({ status: 200, description: 'Returns feedback filtered by status', type: [Feedback] })
  @ApiResponse({ status: 400, description: 'Invalid status' })
  findByStatus(@Param('status') status: string) {
    return this.feedbackService.findByStatus(status);
  }
}
