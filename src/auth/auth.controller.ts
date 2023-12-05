import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/createuserdto";
import { AuthDto } from "./dto/authuserdto";

@Controller("user")
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post("add")
  async createuser(@Body() createuserdto: CreateUserDto) {
    try {
      const usercreation = await this.authservice.createuser(createuserdto);
      return usercreation;
    } catch (err) {
      throw new BadRequestException(err.message, err.statuscode ?? 400);
    }
  }

  @Post("auth")
  async loginuser(@Body() authdto: AuthDto) {
    try {
      const loggedin = await this.authservice.login(
        authdto.username,
        authdto.password
      );
      return loggedin;
    } catch (err) {
      throw new UnauthorizedException(err.message, err.statuscode ?? 400);
    }
  }
}
