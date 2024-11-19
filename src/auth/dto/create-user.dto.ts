import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @MinLength(8)
    @MaxLength(50)
    //RegEx to check if the password is valid
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have an Uppercase, a lowercase letter and a number'
    })
    password: string

    @IsString()
    @MinLength(1)
    fullName: string
}