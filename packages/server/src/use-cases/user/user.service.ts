import jwt from 'jsonwebtoken';
import { CreateUserDto } from '@dto/user/create-user.dto';
import { FindUserDto } from '@dto/user/find-user.dto';
import { HasUserDto } from '@dto/user/has-user.dto';
import { UpdateUserDto } from '@dto/user/update-user.dto';
import { UserEntity } from '@entities/user-entity/user-entity.service';
import { UserModel } from '@models/user/user.model';
import { UserDocument } from '@models/user/user.schema';
import { Injectable } from '@nestjs/common';
import convertUserDocumentToUserEntity from '@use-cases/converter/user/user.converter';
import {
  DuplicatedUserError,
  UserNotFoundError,
  NotAuthenticatedError,
} from '@errors/user';
import { LoginUserDto } from '@dto/user/login-user.dto';
import config from '@config';

@Injectable()
export class UserService {
  constructor(private readonly userModel: UserModel) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const { response } = await this.userModel.createUser(createUserDto);
    return response;
  }

  async findUser(findUserDto: FindUserDto): Promise<UserDocument> {
    const { response } = await this.userModel.findUser(findUserDto);
    return response;
  }

  async hasUser(hasUserDto: HasUserDto): Promise<boolean> {
    const { response } = await this.userModel.hasUser(hasUserDto);
    return response;
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<boolean> {
    const { response, matched } = await this.userModel.updateUser(
      updateUserDto,
    );

    if (!matched) throw new UserNotFoundError();

    return response;
  }

  async register(createUserDto: CreateUserDto): Promise<UserEntity> {
    const isDuplicatedUser = await this.hasUser({
      userName: createUserDto.userName,
    });

    if (!!isDuplicatedUser) {
      throw new DuplicatedUserError();
    }

    const userDocument = await this.createUser(createUserDto);
    const userEntity = await convertUserDocumentToUserEntity(userDocument);

    return userEntity;
  }

  async login(loginUserDto: LoginUserDto): Promise<string> {
    const hasUserDto = { userName: loginUserDto.userName };
    const hasUser = await this.hasUser(hasUserDto);
    const authenticated = await this.findUser(loginUserDto);

    if (!hasUser) {
      throw new UserNotFoundError();
    }

    if (!authenticated) {
      throw new NotAuthenticatedError();
    }

    // 토큰 생성
    const userToken = jwt.sign({ _id: authenticated._id }, config.jwtSecret);

    return userToken;
  }
}
