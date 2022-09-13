import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '@dto/user/create-user.dto';
import { FindUserDto } from '@dto/user/find-user.dto';
import { HasUserDto } from '@dto/user/has-user.dto';
import { UpdateUserDto } from '@dto/user/update-user.dto';
import { filterEmptyObjectField } from '@utils/index';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserModel {
  constructor(@InjectModel(User.name) private userSchema: Model<User>) {}

  createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const userDocument = new this.userSchema(createUserDto);
    const user = userDocument.save();

    return user;
  }

  findUser(findUserDto: FindUserDto): Promise<UserDocument> {
    return this.userSchema.findOne({ userName: findUserDto.userName }).exec();
  }

  async hasUser(hasUserDto: HasUserDto): Promise<boolean> {
    return !!this.userSchema.findOne(hasUserDto).exec();
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<boolean> {
    const { _id, ...restUpdatedUserDto } = updateUserDto;

    const filteredRestUpdatedUserDto =
      filterEmptyObjectField(restUpdatedUserDto);

    return !!this.userSchema.updateOne(
      { _id: updateUserDto._id },
      { $set: filteredRestUpdatedUserDto },
    );
  }

  getUserList(): Promise<UserDocument[]> {
    return this.userSchema.find().exec();
  }
}
