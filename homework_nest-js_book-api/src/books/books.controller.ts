import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { BooksFilter } from './interfaces/books.interface';

@Controller('books')
export class BooksController {
    constructor(
        private readonly booksService: BooksService,
    ){}
    @Get()
    getAllBooks(
        @Query("author") author: string,
        @Query("minPrice") minPrice: number
    ){
        const filters: BooksFilter = {
            author,
            minPrice: !Number.isNaN(Number(minPrice)) ? Number(minPrice) : null,
        }
        return this.booksService.getAllBooks(filters);
    }
    @Get(":id")
    getBookById(@Param("id") id:string){
        return this.booksService.getById(id)
    }
    @HttpCode(201)
    @Post()
    createBook(@Body() body: CreateBookDto){
        return this.booksService.createBook(body)
    }
    @Delete(":id")
    @HttpCode(204)
    deleteBook(@Param("id") id: string){
        return this.booksService.deleteBook(id);
    }
    @HttpCode(204)
    @Patch(":id")
    updateBook(@Param("id") id:string, @Body() body: UpdateBookDto){
        return this.booksService.updateBook(id,body);
    }
    
}
