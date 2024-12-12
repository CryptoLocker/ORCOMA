import { IsIn, IsInt, IsOptional, IsString, Max, Min, IsUUID, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackDto {
    @ApiProperty({
        description: 'UUID of the reviewer who provided the feedback',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID()
    reviewerId: string;

    @ApiProperty({
        description: 'Detailed feedback from the reviewer',
        example: 'The answer shows good understanding but needs more detail in section 2.'
    })
    @IsString()
    comment: string;

    @ApiProperty({
        description: 'Score given by the reviewer (0-5)',
        minimum: 0,
        maximum: 5,
        example: 4.5
    })
    @IsNumber()
    @Min(0)
    @Max(5)
    score: number;

    @ApiProperty({
        description: 'Status of the review. If not provided, it will be set to "draft"',
        enum: ['draft', 'submitted'],
        default: 'draft'
    })
    @IsString()
    @IsOptional()
    @IsIn(['draft', 'submitted'])
    status?: string;
}
