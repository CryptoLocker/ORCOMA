import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class CreateAnswerDto {

    @ApiProperty({
        description: 'Array of responses provided by the user. Must not be empty.',
        example: ['Yes', 'No', 'Maybe'],
    })
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    responses: string[];

}
