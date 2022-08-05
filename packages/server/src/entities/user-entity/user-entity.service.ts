import { UserModel } from '@models/user/user.model';
import { User, UserDocument } from '@models/user/user.schema';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@dto/user/create-user.dto';
import { FindUserDto } from '@dto/user/find-user.dto';
import { HasUserDto } from '@dto/user/has-user.dto';
import { UpdateUserDto } from '@dto/user/update-user.dto';

@Injectable()
export class UserEntityService {
  constructor(private readonly userModel: UserModel) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.createUser(createUserDto);
  }

  async findUser(findUserDto: FindUserDto): Promise<User> {
    return this.userModel.findUser(findUserDto);
  }

  async hasUser(hasUserDto: HasUserDto): Promise<boolean> {
    return this.userModel.hasUser(hasUserDto);
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<boolean> {
    return this.userModel.updateUser(updateUserDto);
  }

  async getUserList(): Promise<User[]> {
    return this.userModel.getUserList();
  }
}
