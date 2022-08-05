import { UserModel } from '@models/user/user.model';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '@dto/user/create-user.dto';
import { FindUserDto } from '@dto/user/find-user.dto';
import { HasUserDto } from '@dto/user/has-user.dto';
import { UpdateUserDto } from '@dto/user/update-user.dto';
import { UserEntityService } from './user-entity.service';

class UserModelMock {
  constructor() {}

  createUser(createUserDto: CreateUserDto) {}
  hasUser(hasUserDto: HasUserDto) {}
  findUser(findUserDto: FindUserDto) {}
  updateUser(updateUser: UpdateUserDto) {}
  getUserList() {}
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

  it('find user', () => {
    const findUserDto = {
      userName: 'kkirico',
    };

    const spyfn = jest.spyOn(userModel, 'findUser');

    userEntityService.findUser(findUserDto);

    expect(spyfn).toHaveBeenCalledWith(findUserDto);
  });

  it('has user', () => {
    const hasUserDto = {
      userName: 'kkirico',
    };

    const spyfn = jest.spyOn(userModel, 'hasUser');

    userEntityService.hasUser(hasUserDto);

    expect(spyfn).toHaveBeenCalledWith(hasUserDto);
  });

  it('update user', () => {
    const updateUserDto = {
      _id: 'asoeijflskjfoejfl',
      userName: 'kkirico',
      password: 'john6549',
      name: 'heon',
    };

    const spyfn = jest.spyOn(userModel, 'updateUser');

    userEntityService.updateUser(updateUserDto);

    expect(spyfn).toHaveBeenCalledWith(updateUserDto);
  });

  it('get user list', () => {
    const spyfn = jest.spyOn(userModel, 'getUserList');

    userEntityService.getUserList();

    expect(spyfn).toBeCalled();
  });
});
