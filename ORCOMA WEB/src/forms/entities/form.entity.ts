import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FormStatus } from "../interfaces/form-status";
import { FormQuestion } from "./form-question.entity";
import { User } from "src/auth/entities/user.entity";



@Entity('forms')
export class Form {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('uuid')
    authorId: string

    @Column('text', {
        unique: true
    })
    title: string

    @Column('text', {
        nullable: true
    })
    description: string

    @CreateDateColumn()
    creationDate: Date

    @UpdateDateColumn()
    lastUpdateDate: Date

    @Column('enum', {
        enum: FormStatus,
        default: FormStatus.active
    })
    status: FormStatus

    @OneToMany(
        () => FormQuestion,
        (question) => question.form,
        {
            cascade: true
        }
    )
    questions: FormQuestion[]
}
