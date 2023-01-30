import jwt from 'jsonwebtoken';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../../use-cases/user/user.service';
import { DuplicatedUserError, UserNotFoundError } from '@errors/user';
import { NotFoundException } from '@nestjs/common';

class UserServiceMock {
  async login(userName: string, password: string) {
    return { userName, password };
  }
}

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useClass: UserServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('login success', async () => {
      const userName = 'userName';
      const password = 'password';

      const loginUserDto = {
        userName,
        password,
      };

      const userToken = 'token';

      const spyFn = jest.spyOn(service, 'login');
      spyFn.mockResolvedValue(userToken);

      const result = await controller.login({ userName, password });

      expect(spyFn).toBeCalledWith(loginUserDto);
      expect(result).toEqual(userToken);
    });

    it('login fail: User not found', async () => {
      const userName = 'userName';
      const password = 'password';

      const loginUserDto = {
        userName,
        password,
      };

      const spyFn = jest.spyOn(service, 'login');
      spyFn.mockImplementation(() => {
        throw new UserNotFoundError();
      });

      try {
        await controller.login({ userName, password });
        expect(spyFn).toBeCalledWith(loginUserDto);
      } catch (error) {
        expect(error).toEqual(new NotFoundException('User Not Found'));
      }
    });
  });

  it.skip('should call register', () => {
    const name = 'name';
    const userName = 'userName';
    const password = 'password';

    const spyFn = jest.spyOn(service, 'register');
    // controller.register(name, userName, password);

    const createUserDto = {
      name,
      userName,
      password,
    };

    expect(spyFn).toBeCalledWith(createUserDto);
  });
});
