import { IsIn, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateFeedbackDto {
    @IsString()
    message: string;

    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @IsString()
    @IsOptional() 
    @IsIn(['revised', 'pending']) 
    status?: string
}
