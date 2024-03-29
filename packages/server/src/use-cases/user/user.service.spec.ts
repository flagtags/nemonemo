import jwt, { JwtPayload } from 'jsonwebtoken';
import { CreateUserDto } from '@dto/user/create-user.dto';
import { FindUserDto } from '@dto/user/find-user.dto';
import { HasUserDto } from '@dto/user/has-user.dto';
import { UpdateUserDto } from '@dto/user/update-user.dto';
import { UserEntity } from '@entities/user-entity/user-entity.service';
import { IModelResponse } from '@models/response';
import { UserModel } from '@models/user/user.model';
import { UserDocument } from '@models/user/user.schema';
import { Test, TestingModule } from '@nestjs/testing';
import {
  DuplicatedUserError,
  NotAuthenticatedError,
  UserNotFoundError,
} from '@errors/user';
import { UserService } from './user.service';
import { LoginUserDto } from '@dto/user/login-user.dto';

class UserModelMock {
  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<IModelResponse<UserDocument>> {
    return { response: createUserDto as UserDocument, affected: 1 };
  }

  async findUser(
    findUserDto: FindUserDto,
  ): Promise<IModelResponse<UserDocument>> {
    return {
      response: findUserDto as UserDocument,
      matched: 1,
    };
  }

  async hasUser(hasUserDto: HasUserDto): Promise<IModelResponse<Boolean>> {
    return {
      response: !!hasUserDto,
      matched: 1,
    };
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
  ): Promise<IModelResponse<Boolean>> {
    return {
      response: !!updateUserDto,
      matched: 1,
    };
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

    test('duplicated user: throw DuplicatedUserError', async () => {
      const createUserDto: CreateUserDto = {
        name: 'dante',
        userName: 'dante022',
        password: 'john6549',
      };

      const hasUserSpyFn = jest.spyOn(service, 'hasUser');
      hasUserSpyFn.mockResolvedValueOnce(true);
      const createUserSpyfn = jest.spyOn(service, 'createUser');

      const duplicatedUserError = new DuplicatedUserError();

      await expect(async () =>
        service.register(createUserDto),
      ).rejects.toThrowError(duplicatedUserError);
      expect(createUserSpyfn).not.toHaveBeenCalled();
    });
  });

  test('create user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'dante',
      userName: 'dante022',
      password: 'john6549',
    };

    const createUserSpyfn = jest.spyOn(userModel, 'createUser');

    await service.createUser(createUserDto);

    expect(createUserSpyfn).toHaveBeenCalledWith(createUserDto);
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
    test('login fail: 유저 없음', async () => {
      const loginUserDto: LoginUserDto = {
        userName: 'dante022',
        password: 'john6549',
      };

      const spyfn = jest.spyOn(userModel, 'hasUser');
      spyfn.mockResolvedValueOnce({
        response: false,
        matched: 1,
      });

      const userNotFoundError = new UserNotFoundError();

      await expect(async () =>
        service.login(loginUserDto),
      ).rejects.toThrowError(userNotFoundError);
    });

    test('login fail: wrong password', async () => {
      const loginUserDto: LoginUserDto = {
        userName: 'dante022',
        password: 'john',
      };

      const hasUserSpyFn = jest.spyOn(userModel, 'hasUser');
      const findeUserSpyFn = jest.spyOn(userModel, 'findUser');
      // 유저 있는지
      hasUserSpyFn.mockResolvedValueOnce({
        response: true,
        matched: 1,
      });
      // 비밀번호 맞는지
      findeUserSpyFn.mockResolvedValueOnce({
        response: null,
        matched: 0,
      });

      const userNotFoundError = new NotAuthenticatedError();

      await expect(async () =>
        service.login(loginUserDto),
      ).rejects.toThrowError(userNotFoundError);
    });

    test('login success', async () => {
      const loginUserDto: LoginUserDto = {
        userName: 'dante022',
        password: 'john6549',
      };

      const hasUserSpyFn = jest.spyOn(userModel, 'hasUser');
      const findeUserSpyFn = jest.spyOn(userModel, 'findUser');
      // 유저 있는지
      hasUserSpyFn.mockResolvedValueOnce({
        response: true,
        matched: 1,
      });
      // 비밀번호 맞는지
      findeUserSpyFn.mockResolvedValueOnce({
        response: {
          _id: 'asdf',
          userName: 'dante022',
          password: 'john6549',
          name: '',
          isBanned: false,
        } as unknown as UserDocument,
        matched: 0,
      });

      const userToken = await service.login(loginUserDto);
      const { _id } = jwt.decode(userToken) as JwtPayload;

      expect(_id).toEqual('asdf');
    });
  });
});
