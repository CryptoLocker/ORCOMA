import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Min, Max } from 'class-validator';
import { Answer } from '../../answers/entities/answer.entity';

@Entity()
export class Feedback {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'UUID of the reviewer who provided the feedback',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @Column('uuid')
    reviewerId: string;

    @ApiProperty({
        description: 'Detailed feedback from the reviewer',
        example: 'The answer shows good understanding but needs more detail in section 2.'
    })
    @Column('text')
    comment: string;

    @ApiProperty({
        description: 'Score given by the reviewer (0-5)',
        minimum: 0,
        maximum: 5,
        example: 4.5
    })
    @Min(0)
    @Max(5)
    @Column('float')
    score: number;

    @ApiProperty({
        description: 'Status of the review',
        enum: ['draft', 'submitted', 'revised'],
        default: 'draft',
        example: 'draft'
    })
    @Column({ default: 'draft' })
    status: string;

    @ApiProperty({
        description: 'The answer being reviewed',
        type: () => Answer
    })
    @OneToOne(() => Answer)
    @JoinColumn()
    answer: Answer;

    @CreateDateColumn()
    createdAt: Date;
}

