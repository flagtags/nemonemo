import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserModel {
  constructor(
    @InjectModel(User.name) private userSchema: Model<UserDocument>,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    const userDocument = new this.userSchema(createUserDto);
    const user = userDocument.save();

    return user;
  }
}
