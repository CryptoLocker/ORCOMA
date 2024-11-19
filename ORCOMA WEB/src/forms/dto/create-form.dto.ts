import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsEnum, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { FormStatus } from '../interfaces';
import { CreateQuestionDto } from './create-question.dto';
import { CreateFormVideoDto } from './create-form-video.dto';

export class CreateFormDto {
  @ApiProperty({
    description: 'Title of the form',
    minLength: 1,
    example: 'Customer Satisfaction Survey',
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiPropertyOptional({
    description: 'Optional description of the form',
    example: 'This survey is to gather customer feedback on our services.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Status of the form',
    enum: FormStatus,
    example: FormStatus.active,
  })
  @IsEnum(FormStatus)
  @IsOptional()
  status?: FormStatus;

  @ApiProperty({
    description: 'List of questions included in the form',
    type: [CreateQuestionDto],
  })
  @IsArray()
  @ArrayNotEmpty({ message: 'Form must have at least one question' })
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];

  @ApiPropertyOptional({
    description: 'Video associated with the form',
    type: CreateFormVideoDto,
  })
  @ValidateNested()
  @Type(() => CreateFormVideoDto)
  @IsOptional()
  video?: CreateFormVideoDto;
}
