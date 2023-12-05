import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Put,
} from "@nestjs/common";
import { UserService } from "./user.service";
import mongoose from "mongoose";
import { AuthDto } from "src/auth/dto/authuserdto";
import { UpdateDto } from "./dto/updatedto";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUser() {
    const getUsers = await this.userService.getAll();
    return getUsers;
  }

  @Get(":id")
  async getbyid(@Param("id") userId: mongoose.Types.ObjectId) {
    try {
      const userbyid = await this.userService.getbyid(userId);
      return userbyid;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Delete(":id")
  async deletebyid(@Param("id") userId: mongoose.Types.ObjectId) {
    try {
      const deleteduser = await this.userService.deletebyid(userId);
      return { message: `User Delted with #${userId}` };
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Put(":id")
  async updatebyid(
    @Param("id") userId: mongoose.Types.ObjectId,
    @Body() updatedto: UpdateDto
  ) {
    try {
      const updateduser = await this.userService.updatebyId(userId, updatedto);
      return updateduser;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
