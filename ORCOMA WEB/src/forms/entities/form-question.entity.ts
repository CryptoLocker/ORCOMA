import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Form } from "./form.entity";
import { QuestionType } from "../interfaces/question-type";
import { Answer } from "src/answers/entities/answer.entity";



@Entity()
export class FormQuestion {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    text: string

    @Column('enum', {
        enum: QuestionType
    })
    type: QuestionType

    @Column('bool', {
        default: true
    })
    required: boolean

    @Column('text', {
        array: true,
        nullable: true
    })
    options ?: string[] 

    @ManyToOne(
        () => Form,
        (form) => form.questions,
        { onDelete: 'CASCADE' }
    )
    form: Form

    @OneToMany(
        () => Answer,
        (answer) => answer.question,
        {
            cascade: true
        }
    )
    answers: Answer[]
    
}