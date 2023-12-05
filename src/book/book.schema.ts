import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
@Schema({ timestamps: true })
export class Book {
  id: mongoose.Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  genre: string;
}

// export const BookDocument = Book && Document;
export const BookSchema = SchemaFactory.createForClass(Book);
