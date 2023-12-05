import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Book } from "./book.schema";
import { Model } from "mongoose";
import { BookDto } from "./dto/bookdto";

@Injectable()
export class BookService{
    constructor(@InjectModel(Book.name) private bookmodel:Model<Book>){}


    async createbook(bookdto:BookDto){
        const bookcreation = await this.bookmodel.create(bookdto);
        return bookcreation
    }
}