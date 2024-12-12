import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        description: 'Email address of the user',
        example: 'user@example.com',
    })
    @IsString()
    @IsEmail()
    email: string

    @ApiProperty({
        description: 'Password for the user. Must include an uppercase letter, a lowercase letter, and a number.',
        example: 'Password123',
        minLength: 8,
        maxLength: 50,
    })
    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have an Uppercase, a lowercase letter and a number',
    })
    password: string;

    @ApiProperty({
        description: 'Full name of the user',
        example: 'John Doe',
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    fullName: string
}
