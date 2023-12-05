import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Book, BookSchema } from "./book.schema";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { AuthModule } from "src/auth/auth.module";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports:[MongooseModule.forFeature([{name:Book.name,schema:BookSchema}]),
AuthModule],
    controllers:[BookController],
    providers:[BookService,JwtService]
})

export class BookModule{}