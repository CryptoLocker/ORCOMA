import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

import { FormQuestion } from "src/forms/entities";

@Entity()
export class Answer {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text', {
        array: true,
    })
    responses: string[]

    @Column('uuid')
    userId: string

    @CreateDateColumn()
    answeredAt: Date

    @ManyToOne(
        () => FormQuestion,
        (question) => question.answers,
        { onDelete: 'CASCADE' },
    )
    question: FormQuestion

}

