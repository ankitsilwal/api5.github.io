import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/api/user.schema";
import { CreateUserDto } from "./dto/createuserdto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async createuser(createuserdto: CreateUserDto) {
    const { username, password, role, pnumber } = createuserdto;
    const hashedpassword = await bcrypt.hash(password, 10);
    const usercreation = await this.userModel.create({
      username,
      password: hashedpassword,
      role,
      pnumber,
    });
    if (!usercreation) {
      throw new BadRequestException(`Please enter correct Details`);
    }
    return usercreation;
  }

  async findbyusername(username: string) {
    const findusername = await this.userModel.findOne({ username });
    return findusername;
  }

  async login(username: string, password: string) {
    const byusername = await this.findbyusername(username);
    if (!byusername) {
      throw new UnauthorizedException(`username notfound`);
    }

    const validPassword = await bcrypt.compare(password, byusername.password);
    if (!validPassword) {
      throw new UnauthorizedException(`Password does not matched`);
    }
    const payload = { sub: byusername.id, username:username };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    return { accessToken };
  }
}
