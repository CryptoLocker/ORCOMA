import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from '../../forms/dto/create-question.dto';

export class UpdateAnswerDto extends PartialType(CreateQuestionDto) {}
