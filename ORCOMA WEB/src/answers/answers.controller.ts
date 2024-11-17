import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, UseGuards } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { ParseDatePipe } from 'src/common/pipes/parse-date.pipe';

@Controller('answers')
@Auth()
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post(':id')
  create(
    @Param('id', ParseUUIDPipe) questionId: string,
    @Body() createAnswerDto: CreateAnswerDto,
    @GetUser() user: User,
  ) {
    return this.answersService.create(questionId, createAnswerDto, user);
  }

  @Get('question/:id')
  findByQuestion(@Param('id', ParseUUIDPipe) questionId: string,) {
    return this.answersService.findByQuestionId(questionId);
  }

  @Get('user/:id')
  findByUser(@Param('id', ParseUUIDPipe) userId: string,) {
    return this.answersService.findByUserId(userId);
  }

  @Get('by-date-range')
  findByDateRange(
    @Query('startDate', ParseDatePipe) startDate: Date,
    @Query('endDate', ParseDatePipe) endDate: Date,
  ) {
    return this.answersService.findByDateRange(startDate, endDate);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.answersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.answersService.remove(id);
  }
}
