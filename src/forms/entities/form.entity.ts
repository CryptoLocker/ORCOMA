import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FormStatus } from "../interfaces/form-status";
import { FormQuestion } from "./form-question.entity";
import { FormVideo } from "./form-video.entity";

@Entity('forms')
export class Form {

    @ApiProperty({
        description: 'Unique identifier of the form',
        example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Unique identifier of the author who created the form',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @Column('uuid')
    authorId: string;

    @ApiProperty({
        description: 'Title of the form',
        example: 'Customer Feedback Survey',
    })
    @Column('text', {
        unique: true,
    })
    title: string;

    @ApiPropertyOptional({
        description: 'Optional description of the form',
        example: 'A survey to gather customer feedback on our services.',
    })
    @Column('text', {
        nullable: true,
    })
    description?: string;

    @ApiProperty({
        description: 'Date when the form was created',
        example: '2023-01-01T00:00:00.000Z',
    })
    @CreateDateColumn()
    creationDate: Date;

    @ApiProperty({
        description: 'Date when the form was last updated',
        example: '2023-01-02T00:00:00.000Z',
    })
    @UpdateDateColumn()
    lastUpdateDate: Date;

    @ApiProperty({
        description: 'Status of the form',
        enum: FormStatus,
        example: FormStatus.active,
    })
    @Column('enum', {
        enum: FormStatus,
        default: FormStatus.active,
    })
    status: FormStatus;

    @ApiProperty({
        description: 'List of questions associated with the form',
        type: [FormQuestion],
    })
    @OneToMany(
        () => FormQuestion,
        (question) => question.form,
        {
            cascade: true,
        },
    )
    questions: FormQuestion[];

    @ApiPropertyOptional({
        description: 'Optional video associated with the form',
        type: FormVideo,
    })
    @OneToOne(
        () => FormVideo, 
        (formVideo) => formVideo.form, 
        { 
            cascade: true, 
            nullable: true,
        },
    )
    @JoinColumn()
    video?: FormVideo;
}
