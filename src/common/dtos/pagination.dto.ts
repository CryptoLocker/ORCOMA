import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PaginationDto {

    @ApiProperty({
        description: 'Number of items to return per page',
        minimum: 1,
        required: false,
        example: 10,
    })
    @IsOptional()
    @IsPositive()
    @Type( () => Number)
    limit?: number

    @ApiProperty({
        description: 'Number of items to skip',
        minimum: 0,
        required: false,
        example: 0,
    })
    @IsOptional()
    @Min(0)
    @Type( () => Number)
    offset?: number
}