import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsEnum, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { FormStatus } from "../interfaces";
import { CreateQuestionDto } from "./create-question.dto";

export class CreateFormDto {

    @IsString()
    @MinLength(1)
    title: string

    @IsString()
    @IsOptional()
    description ?: string

    @IsEnum(FormStatus)
    @IsOptional()
    status ?: FormStatus

    @IsArray()
    @ArrayNotEmpty({ message: 'Form must have at least one question' })
    @ValidateNested({ each: true })
    @Type(() => CreateQuestionDto)
    questions: CreateQuestionDto[];

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[]
}
