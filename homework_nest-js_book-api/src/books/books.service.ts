import { Injectable, NotFoundException } from '@nestjs/common';
import { Books, BooksFilter } from './interfaces/books.interface';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { CreateBookDto } from './dtos/create-book.dto';
import {v4 as uuid} from "uuid"
import { UpdateBookDto } from './dtos/update-book.dto';

@Injectable()
export class BooksService {
    private BOOKS_PATH = join(process.cwd(), "src", "books", "data", "books.json")
    async getAllBooks(filters?: BooksFilter){
        const booksJson = await readFile(this.BOOKS_PATH, "utf-8");
        let books = JSON.parse(booksJson) as Books[];
        if(filters?.minPrice){
            books = books.filter(book => book.price >= (filters.minPrice as number),)
        }
        if(filters?.author){
            books = books.filter(book => book.author.toLowerCase().includes(filters.author?.toLowerCase() as string))
        }
        return books;
    }
    async getById(id: string){
        const books = await this.getAllBooks();
        const foundBook = books.find(book => book.id === id);
        if(!foundBook) throw new NotFoundException("Book doesn't exist");
        return foundBook;
    }
    async saveBooks(data: Books[]){
        await writeFile(this.BOOKS_PATH, JSON.stringify(data,null,2), "utf-8");
    }
    async createBook(data: CreateBookDto){
        const books = await this.getAllBooks();
        const newBook  = {
            id: uuid(),
            ...data
        }
        books.push(newBook);
        await this.saveBooks(books);
        return newBook;
    }
    async deleteBook(id: string){
        const books = await this.getAllBooks();
        const updatedBooks = books.filter(books => books.id !== id);
        if(books.length === updatedBooks.length) throw new NotFoundException("Book doesn't exist");
        await this.saveBooks(updatedBooks);
    }
    async updateBook(id:string, body: UpdateBookDto){
        const books = await this.getAllBooks();
        const foundBook = books.find(books => books.id === id);
        if(!foundBook) throw new NotFoundException("Book doesn't exist");
        const updatedBooks = books.map(book => book.id === id ? {...book, ...body} : book);
        await this.saveBooks(updatedBooks);
    }
}
