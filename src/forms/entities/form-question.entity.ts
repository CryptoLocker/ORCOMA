import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Form } from "./form.entity";
import { QuestionType } from "../interfaces/question-type";
import { Answer } from "src/answers/entities/answer.entity";

@Entity()
export class FormQuestion {

    @ApiProperty({
        description: 'Unique identifier for the question',
        example: '7cb59be0-70c5-11ed-a1eb-0242ac120002',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Text of the question',
        example: 'What is your favorite color?',
    })
    @Column('text')
    text: string;

    @ApiProperty({
        description: 'Type of the question',
        enum: QuestionType,
        example: QuestionType.SingleChoice,
    })
    @Column('enum', {
        enum: QuestionType,
    })
    type: QuestionType;

    @ApiProperty({
        description: 'Indicates if the question is required',
        example: true,
    })
    @Column('bool', {
        default: true,
    })
    required: boolean;

    @ApiPropertyOptional({
        description: 'Optional array of answer choices for the question',
        example: ['Red', 'Blue', 'Green'],
    })
    @Column('text', {
        array: true,
        nullable: true,
    })
    options?: string[];

    @ApiProperty({
        description: 'Form to which this question belongs',
        type: () => Form,
    })
    @ManyToOne(
        () => Form,
        (form) => form.questions,
        { onDelete: 'CASCADE' },
    )
    form: Form;

    @ApiProperty({
        description: 'Answers provided for this question',
        type: [Answer],
    })
    @OneToMany(
        () => Answer,
        (answer) => answer.question,
        {
            cascade: true,
        },
    )
    answers: Answer[];
}
