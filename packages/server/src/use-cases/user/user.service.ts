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
import { DuplicatedUserError, UserNotFoundError } from '@errors/user';
import { LoginUserDto } from '@dto/user/login-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userModel: UserModel) {}

  createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.userModel.createUser(createUserDto);
  }

  findUser(findUserDto: FindUserDto): Promise<UserDocument> {
    return this.userModel.findUser(findUserDto);
  }

  hasUser(hasUserDto: HasUserDto): Promise<boolean> {
    return this.userModel.hasUser(hasUserDto);
  }

  updateUser(updateUserDto: UpdateUserDto): Promise<boolean> {
    return this.userModel.updateUser(updateUserDto);
  }

  async register(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userDocument = await this.createUser(createUserDto);
    const userEntity = await convertUserDocumentToUserEntity(userDocument);

    const isDuplicatedUser = await this.hasUser({
      userName: createUserDto.userName,
    });

    if (isDuplicatedUser) {
      throw new DuplicatedUserError();
    }

    return userEntity;
  }
  async login(loginUserDto: LoginUserDto): Promise<string> {
    const hasUserDto = { userName: loginUserDto.userName };
    const hasUser = await this.hasUser(hasUserDto);
    const authenticated = await this.hasUser(loginUserDto);

    if (!hasUser) {
      throw new UserNotFoundError();
    }
    if (!authenticated) {
      throw new Error('not authenticated');
    }

    // 토큰 생성
    const userToken = jwt.sign({ userName: loginUserDto.userName }, 'flatag');

    return userToken;
  }
}
