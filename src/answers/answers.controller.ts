import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { ParseDatePipe } from 'src/common/pipes/parse-date.pipe';

@ApiTags('Answers')
@ApiBearerAuth()
@Controller('answers')
@Auth()
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @ApiOperation({ summary: 'Create a new answer for a question' })
  @ApiParam({ name: 'id', description: 'Question ID', type: 'string' })
  @ApiResponse({ status: 201, description: 'Answer created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })

  @Post(':id')
  create(
    @Param('id', ParseUUIDPipe) questionId: string,
    @Body() createAnswerDto: CreateAnswerDto,
    @GetUser() user: User,
  ) {
    return this.answersService.create(questionId, createAnswerDto, user);
  }

  @Get('question/:id')
  @ApiOperation({ summary: 'Get all answers for a specific question' })
  @ApiParam({ name: 'id', description: 'Question ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Returns all answers for the question' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  findByQuestion(@Param('id', ParseUUIDPipe) questionId: string,) {
    return this.answersService.findByQuestionId(questionId);
  }

  @ApiOperation({ summary: 'Get all answers by a specific user' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Returns all answers by the user' })
  @ApiResponse({ status: 404, description: 'User not found' })

  @Get('user/:id')
  findByUser(@Param('id', ParseUUIDPipe) userId: string,) {
    return this.answersService.findByUserId(userId);
  }

  @Get('by-date-range')
  @ApiOperation({ summary: 'Get answers within a date range' })
  @ApiQuery({ name: 'startDate', description: 'Start date (YYYY-MM-DD)', type: 'string' })
  @ApiQuery({ name: 'endDate', description: 'End date (YYYY-MM-DD)', type: 'string' })
  @ApiResponse({ status: 200, description: 'Returns answers within the date range' })
  @ApiResponse({ status: 400, description: 'Invalid date format' })
  findByDateRange(
    @Query('startDate', ParseDatePipe) startDate: Date,
    @Query('endDate', ParseDatePipe) endDate: Date,
  ) {
    return this.answersService.findByDateRange(startDate, endDate);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific answer by ID' })
  @ApiParam({ name: 'id', description: 'Answer ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Returns the answer' })
  @ApiResponse({ status: 404, description: 'Answer not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.answersService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific answer' })
  @ApiParam({ name: 'id', description: 'Answer ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Answer deleted successfully' })
  @ApiResponse({ status: 404, description: 'Answer not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.answersService.remove(id);
  }
}
