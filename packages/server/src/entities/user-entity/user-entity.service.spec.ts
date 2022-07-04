import { UserModel } from '@models/user/user.model';
import { User, UserSchema } from '@models/user/user.schema';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UserEntityService } from './user-entity.service';

class UserModelMock {
  constructor() {}

  createUser(createUserDto: CreateUserDto) {}
}

describe('UserEntityService', () => {
  let userEntityService: UserEntityService;
  let userModel: UserModelMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserEntityService,
        { provide: UserModel, useClass: UserModelMock },
      ],
    }).compile();

    userEntityService = module.get<UserEntityService>(UserEntityService);
    userModel = module.get<UserModelMock>(UserModel);
  });

  it('should be defined', () => {
    expect(userEntityService).toBeDefined();
  });

  it('create user', () => {
    const createUserDto = {
      name: 'name',
      userName: 'userName',
      password: 'password',
    };

    const spyfn = jest.spyOn(userModel, 'createUser');

    userEntityService.createUser(createUserDto);

    expect(spyfn).toHaveBeenCalledWith(createUserDto);
  });
});
