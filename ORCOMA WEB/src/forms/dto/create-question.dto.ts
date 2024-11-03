// form-questions/form-question.dto.ts
import { IsString, IsEnum, IsArray, IsOptional, IsBoolean, ValidateNested } from 'class-validator';
import { QuestionType } from '../interfaces';
import { CreateAnswerDto } from 'src/answers/dto/create-answer.dto';
import { Type } from 'class-transformer';

export class CreateQuestionDto {

  @IsString()
  text: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsBoolean()
  @IsOptional()
  required?: boolean

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  options?: string[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  questions?: CreateAnswerDto[];
}
