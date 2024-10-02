import { IsInt, IsString, Max, Min, MinLength } from "class-validator"

export class CreateUserDto {

    @IsString()
    @MinLength(1)
    firstName: string

    @IsString()
    @MinLength(1)
    lastName: string

    @IsInt()
    @Min(1000000000)
    @Max(9999999999)
    docId: number

}
