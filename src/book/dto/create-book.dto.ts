import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Category } from "../schemas/book.schema"
import { User } from "src/auth/schemas/user.schema"

export class CreateBookDto{

    @IsString()
    @IsNotEmpty()
    readonly title: string

    @IsString()
    @IsNotEmpty()
    readonly description: string
    @IsString()
    @IsNotEmpty()
    readonly author: string

    @IsNumber()
    @IsNotEmpty()
    readonly price: number

    @IsEnum(Category, {message: 'Please enter correct category'})
    @IsNotEmpty()
    readonly category: Category

    @IsEmpty({
        message: "You cannot pass user id"
    })
    readonly user: User
}