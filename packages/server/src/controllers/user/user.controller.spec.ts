import jwt from 'jsonwebtoken';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../../use-cases/user/user.service';
import { DuplicatedUserError, UserNotFoundError } from '@errors/user';
import { NotFoundException } from '@nestjs/common';
import { LoginUserDto } from '@dto/user/login-user.dto';
import { CreateUserDto } from '@dto/user/create-user.dto';
import { Response } from 'express';

class UserServiceMock {
  async login({ userName, password }: LoginUserDto) {
    return { userName, password };
  }

  async register({ userName, password, name }: CreateUserDto) {
    return { userName, password, name };
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

      const res = {
        query: {},
        header: {},
        data: null,
        json(payload) {
          this.data = JSON.stringify(payload);
        },
        cookie(name, value, options) {
          this.header[name] = value;
        },
      } as unknown as Response;

      await controller.login({ userName, password }, res);

      expect(spyFn).toBeCalledWith(loginUserDto);
      expect(res.header['token']).toEqual(userToken);
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
        await controller.login({ userName, password }, null);
        expect(spyFn).toBeCalledWith(loginUserDto);
      } catch (error) {
        expect(error).toEqual(new NotFoundException('User Not Found'));
      }
    });
  });

  it('should call register', () => {
    const name = 'name';
    const userName = 'userName';
    const password = 'password';

    const spyFn = jest.spyOn(service, 'register');
    controller.register({ name, userName, password });

    const createUserDto = {
      name,
      userName,
      password,
    };

    expect(spyFn).toBeCalledWith(createUserDto);
  });
});
