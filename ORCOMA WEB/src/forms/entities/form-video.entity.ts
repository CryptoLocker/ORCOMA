import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Form } from './form.entity';

@Entity()
export class FormVideo {
  @ApiProperty({
    description: 'Unique identifier of the video',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Path of the video',
    example: 'example-folder/form-related-topics/video.mp4',
  })
  @Column('text')
  path: string;

  @ApiProperty({
    description: 'Title of the video',
    example: 'Introduction Video',
  })
  @Column('text', { unique: true })
  title: string;

  @ApiPropertyOptional({
    description: 'Optional description of the video',
    example: 'This video provides an introduction to the form.',
  })
  @Column('text', { nullable: true })
  description?: string;

  @ApiProperty({
    description: 'Form associated with this video',
    type: () => Form,
  })
  @OneToOne(
    () => Form,
    (form) => form.video,
    { onDelete: 'CASCADE' },
  )
  form: Form;
}
