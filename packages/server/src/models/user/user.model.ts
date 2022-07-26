import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { FindUserDto } from 'src/dto/user/find-user.dto';
import { HasUserDto } from 'src/dto/user/has-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserModel {
  constructor(
    @InjectModel(User.name) private userSchema: Model<UserDocument>,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const userDocument = new this.userSchema(createUserDto);
    const user = userDocument.save();

    return user;
  }

  findUser(findUserDto: FindUserDto): Promise<UserDocument> {
    return this.userSchema.findOne({userName: findUserDto.userName}).exec();
  }

  hasUser(hasUserDto: HasUserDto): boolean {
    return !!this.userSchema.findOne({userName: hasUserDto.userName}).exec();
  }
}
