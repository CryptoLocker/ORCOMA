import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateFormVideoDto {

  @ApiProperty({
    description: 'Title of the video',
    example: 'Introduction to our platform',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Optional description of the video',
    example: 'This video provides an overview of our services.',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
