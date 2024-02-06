import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model, isValidObjectId } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private bookModel: Model <Book>) {}

    async findAll(): Promise<Book[]>{
        const books = await this.bookModel.find()
        return books
    }

    async create(book: Book, user: User):Promise<Book> {

        const data = Object.assign(book, { user: user._id})
        const res = await this.bookModel.create(data)
        return res
    }
    
    async findOne(id: string): Promise<Book>{

        const isValidId = isValidObjectId(id)

        if(!isValidId){
            throw new BadRequestException('Please enter correct id')
        }
        const book = await this.bookModel.findById(id)
        if(!book){
            throw new NotFoundException('Book not found')
        }
        return book
    }

    async update(id: string, book: Book): Promise<Book>{
        const updateBook = await this.bookModel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true,
        })

        return updateBook
    }

    async deleteBook(id: string){
        const book = await this.bookModel.findByIdAndDelete(id)
        return book
    }
}
