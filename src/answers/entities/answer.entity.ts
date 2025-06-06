import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn} from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { FormQuestion } from "src/forms/entities";
import { User } from "src/auth/entities/user.entity";

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
        description: 'User who provided the answer',
        type: () => User
    })
    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

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
