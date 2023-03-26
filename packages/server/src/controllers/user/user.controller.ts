import { CreateUserDto } from '@dto/user/create-user.dto';
import { LoginUserDto } from '@dto/user/login-user.dto';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from '@use-cases/user/user.service';
import { Response } from 'express';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(
    @Body() userDTO: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.userService.login(userDTO);
    response.cookie('token', token, {
      httpOnly: true,
      secure: true,
    });
  }

  @Post('register')
  async register(@Body() userDTO: CreateUserDto) {
    return await this.userService.register(userDTO);
  }
}
