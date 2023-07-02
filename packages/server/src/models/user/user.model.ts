import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '@dto/user/create-user.dto';
import { FindUserDto } from '@dto/user/find-user.dto';
import { HasUserDto } from '@dto/user/has-user.dto';
import { UpdateUserDto } from '@dto/user/update-user.dto';
import { filterEmptyObjectField } from '@utils/index';
import { User, UserDocument } from './user.schema';
import { IModelResponse } from '@models/response';

@Injectable()
export class UserModel {
  constructor(@InjectModel(User.name) private userSchema: Model<User>) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<IModelResponse<UserDocument>> {
    const userDocument = new this.userSchema(createUserDto);
    const user = await userDocument.save();

    return {
      response: user,
      matched: 0,
    };
  }

  async findUser(
    findUserDto: FindUserDto,
  ): Promise<IModelResponse<UserDocument>> {
    return {
      response: await this.userSchema.findOne(findUserDto).exec(),
      matched: 1,
    };
  }

  async hasUser(hasUserDto: HasUserDto): Promise<IModelResponse<boolean>> {
    return {
      response: !!(await this.userSchema.findOne(hasUserDto).exec()),
    };
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
  ): Promise<IModelResponse<boolean>> {
    const { _id, ...restUpdatedUserDto } = updateUserDto;

    const filteredRestUpdatedUserDto =
      filterEmptyObjectField(restUpdatedUserDto);

    const res = await this.userSchema.updateOne(
      { _id: updateUserDto._id },
      { $set: filteredRestUpdatedUserDto },
    );

    return {
      response: !!res.modifiedCount,
      affected: res.matchedCount,
    };
  }

  async getUserList(): Promise<IModelResponse<UserDocument[]>> {
    const userList = await this.userSchema.find().exec();

    return {
      response: userList,
      matched: userList.length,
    };
  }
}
