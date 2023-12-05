import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { BookService } from "./book.service";
import { BookDto } from "./dto/bookdto";
import { AuthGuard } from "src/auth/auth.gurad";

@Controller("book")
@UseGuards(AuthGuard)
export class BookController{
    constructor(private bookService:BookService){}


    @Post("add")
    async createbook(@Body() bookdto:BookDto){
        const bookcreation = await this.bookService.createbook(bookdto);
        return bookcreation;
    }
}