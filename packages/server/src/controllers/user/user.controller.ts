import { DuplicatedUserError, UserNotFoundError } from '@errors/user';
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { UserService } from '@use-cases/user/user.service';
import { LoginUserDto } from '@dto/user/login-user.dto';
import { CreateUserDto } from '@dto/user/create-user.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() userDTO: LoginUserDto) {
    return await this.userService.login(userDTO);
  }

  @Post('register')
  async register(@Body() userDTO: CreateUserDto) {
    return await this.userService.register(userDTO);
  }
}
