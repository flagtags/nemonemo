import { UserModel } from '@models/user/user.model';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user/create-user.dto';

@Injectable()
export class UserEntityService {
  constructor(private readonly userModel: UserModel) {}

  createUser(createUserDto: CreateUserDto) {
    return this.userModel.createUser(createUserDto);
  }
}
