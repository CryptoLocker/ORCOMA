import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { FormQuestion } from "src/forms/entities";

@Entity()
export class Answer {
    @ApiProperty({
        description: "Answer's UUID",
        example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({
        description: 'Array of response strings for the question',
        example: ['Yes', 'Option A'],
        isArray: true
    })
    @Column('text', {
        array: true,
    })
    responses: string[]

    @ApiProperty({
        description: 'UUID of the user who provided the answer',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @Column('uuid')
    userId: string

    @ApiProperty({
        description: 'Timestamp when the answer was submitted',
        example: '2023-01-01T00:00:00.000Z'
    })
    @CreateDateColumn()
    answeredAt: Date

    @ApiProperty({
        description: 'The form question this answer belongs to',
        type: () => FormQuestion
    })
    @ManyToOne(
        () => FormQuestion,
        (question) => question.answers,
        { onDelete: 'CASCADE' },
    )
    question: FormQuestion

}

