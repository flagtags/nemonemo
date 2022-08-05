import { CreateUserDto } from '@dto/user/create-user.dto';
import { UserEntityService } from '@entities/user-entity/user-entity.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

class UserEntityServiceMock {
  createUser(createUserDto: CreateUserDto) {}
}

describe('UserService', () => {
  let service: UserService;
  let userEntityService: UserEntityServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserEntityService, useClass: UserEntityServiceMock },
      ],
    }).compile();

    userEntityService = module.get<UserEntityService>(UserEntityService);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('register user service', () => {
    const registeringMockUser: CreateUserDto = {
      name: 'dante',
      userName: 'dante022',
      password: 'john6549',
    };

    const spyfn = jest.spyOn(userEntityService, 'createUser');

    service.register(registeringMockUser);

    expect(spyfn).toBeCalled();
  });
});
