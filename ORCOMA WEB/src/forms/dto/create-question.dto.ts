import { IsString, IsEnum, IsArray, IsOptional, IsBoolean, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'; // Importar decoradores de Swagger
import { QuestionType } from '../interfaces';
import { CreateAnswerDto } from 'src/answers/dto/create-answer.dto';
import { Type } from 'class-transformer';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'Text of the question',
    example: 'What is your favorite color?',
  })
  @IsString()
  text: string;

  @ApiProperty({
    description: 'Type of the question',
    enum: QuestionType,
    example: QuestionType.SingleChoice,
  })
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiPropertyOptional({
    description: 'Indicates if the question is required',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  required?: boolean;

  @ApiPropertyOptional({
    description: 'List of options for choice-related questions',
    type: [String],
    example: ['Red', 'Blue', 'Green', 'Yellow'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  options?: string[];

  @ApiPropertyOptional({
    description: 'List of answers associated with the question',
    type: [CreateAnswerDto],
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers?: CreateAnswerDto[];
}
