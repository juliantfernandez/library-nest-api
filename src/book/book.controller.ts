import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService) {}

    @Get()
    async getAllBooks(): Promise<Book[]>{
        return this.bookService.findAll()
    }

    @Post()
    @UseGuards(AuthGuard())
    async createBook(
        @Body() 
        book:CreateBookDto,
        @Req() req): Promise<Book>{
        return this.bookService.create(book, req.user)
    }

    @Get(':id')
    async findOne( 
        @Param('id')
        id: string): Promise<Book>{
            return this.bookService.findOne(id)
    }

    @Put(':id')
    async updateBook(@Param('id')
    id: string, @Body() book: any){
        return this.bookService.update(id, book)
    }

    @Delete(':id')
    async deleteBook(@Param('id') id: string){
        return this.bookService.deleteBook(id)
    }
}
