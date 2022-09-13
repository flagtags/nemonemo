import jwt, { JwtPayload } from 'jsonwebtoken';
import { CreateUserDto } from '@dto/user/create-user.dto';
import { FindUserDto } from '@dto/user/find-user.dto';
import { HasUserDto } from '@dto/user/has-user.dto';
import { UpdateUserDto } from '@dto/user/update-user.dto';
import { UserEntity } from '@entities/user-entity/user-entity.service';
import { UserModel } from '@models/user/user.model';
import { UserDocument } from '@models/user/user.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { DuplicatedUserError, UserNotFoundError } from '@errors/user';
import { UserService } from './user.service';
import { LoginUserDto } from '@dto/user/login-user.dto';

class UserModelMock {
  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    return createUserDto as UserDocument;
  }

  async findUser(findUserDto: FindUserDto): Promise<UserDocument> {
    return findUserDto as UserDocument;
  }

  async hasUser(hasUserDto: HasUserDto): Promise<Boolean> {
    return !!hasUserDto;
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<Boolean> {
    return !!updateUserDto;
  }
}

describe('UserService', () => {
  let service: UserService;
  let userModel: UserModelMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserModel,
          useClass: UserModelMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get<UserModelMock>(UserModel);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register user', () => {
    test('not duplicated user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'dante',
        userName: 'dante022',
        password: 'john6549',
      };

      const hasUserSpyFn = jest.spyOn(service, 'hasUser');
      hasUserSpyFn.mockResolvedValueOnce(false);

      const userEntity = await service.register(createUserDto);

      Object.keys(createUserDto).forEach((key) => {
        expect(userEntity[key]).toBe(createUserDto[key]);
      });
      expect(userEntity.isBanned).toBe(false);
    });

    test('duplicated user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'dante',
        userName: 'dante022',
        password: 'john6549',
      };

      const hasUserSpyFn = jest.spyOn(service, 'hasUser');
      hasUserSpyFn.mockResolvedValueOnce(true);

      const userEntity = service.register(createUserDto);

      const duplicatedUserError = new DuplicatedUserError();

      expect(userEntity).rejects.toThrowError(duplicatedUserError);
    });
  });

  test('create user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'dante',
      userName: 'dante022',
      password: 'john6549',
    };

    const spyfn = jest.spyOn(userModel, 'createUser');

    await service.createUser(createUserDto);

    expect(spyfn).toHaveBeenCalledWith(createUserDto);
  });

  test('update user', async () => {
    const updateUserDto: UpdateUserDto = {
      _id: '_id',
      name: 'dante',
      userName: 'dante022',
      password: 'john6549',
      isBanned: false,
    };

    const spyfn = jest.spyOn(userModel, 'updateUser');

    await service.updateUser(updateUserDto);

    expect(spyfn).toHaveBeenCalledWith(updateUserDto);
  });

  test('find user', async () => {
    const findUserDto: FindUserDto = {
      userName: 'dante022',
    };

    const spyfn = jest.spyOn(userModel, 'findUser');

    await service.findUser(findUserDto);

    expect(spyfn).toHaveBeenCalledWith(findUserDto);
  });

  test('has user', async () => {
    const hasUserDto: HasUserDto = {
      userName: 'dante022',
    };

    const spyfn = jest.spyOn(userModel, 'hasUser');

    await service.hasUser(hasUserDto);

    expect(spyfn).toHaveBeenCalledWith(hasUserDto);
  });

  describe('login', () => {
    test('login fail', async () => {
      const loginUserDto: LoginUserDto = {
        userName: 'dante022',
        password: 'john6549',
      };

      const spyfn = jest.spyOn(userModel, 'hasUser');
      spyfn.mockResolvedValueOnce(false);

      const userNotFoundError = new UserNotFoundError();

      await expect(async () =>
        service.login(loginUserDto),
      ).rejects.toThrowError(userNotFoundError);
    });

    test('login success', async () => {
      const loginUserDto: LoginUserDto = {
        userName: 'dante022',
        password: 'john6549',
      };

      const userToken = await service.login(loginUserDto);
      const { userName: decodedUserName } = jwt.decode(userToken) as JwtPayload;

      expect(loginUserDto.userName).toEqual(decodedUserName);
    });
  });
});
