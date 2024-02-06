import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class SignUpDto{

    @IsString()
    @IsNotEmpty()
    readonly name: string

    @IsEmail({}, {message: 'Please enter correct email'})
    @IsNotEmpty()
    readonly email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string
}