import { UserNotFoundError } from '@errors/user';
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { UserService } from '@use-cases/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(
    @Body('userName') userName: string,
    @Body('password') password: string,
  ) {
    const userDTO = {
      userName,
      password,
    };

    try {
      return await this.userService.login(userDTO);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
