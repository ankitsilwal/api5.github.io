import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import mongoose, { Model } from "mongoose";
import { UpdateDto } from "./dto/updatedto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAll(): Promise<User[]> {
    const getAllUsers = await this.userModel.find({}, { password: 0 });
    return getAllUsers;
  }

  async getbyid(userId: mongoose.Types.ObjectId): Promise<User> {
    const userbyid = await this.userModel.findById(userId, { password: 0 });
    if (!userbyid) {
      throw new NotFoundException(`User not found`);
    }
    return userbyid;
  }

  async deletebyid(userId: mongoose.Types.ObjectId) {
    const deleteduser = await this.userModel.findByIdAndDelete(userId);
    if (!deleteduser) {
      throw new NotFoundException(`User not found`);
    }
    return deleteduser;
  }

  async updatebyId(
    userId: mongoose.Types.ObjectId,
    updatedto: UpdateDto
  ): Promise<User> {
    const { username, password, role, pnumber } = updatedto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { ...updatedto, password: hashedPassword },
      { new: true }
    );
    if (!updatedUser) {
      throw new NotFoundException(`User not found`);
    }
    return updatedUser;
  }
}
