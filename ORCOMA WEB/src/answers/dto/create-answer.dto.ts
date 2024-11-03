import { ArrayNotEmpty, IsArray, IsOptional, IsString } from 'class-validator';

export class CreateAnswerDto{

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  responses: string[];

}
