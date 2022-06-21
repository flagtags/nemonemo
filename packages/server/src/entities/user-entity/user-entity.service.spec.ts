import { Test, TestingModule } from '@nestjs/testing';
import { UserEntityService } from './user-entity.service';

describe('UserEntityService', () => {
  let userEntityService: UserEntityService;
  let userModelService: UserModelService;

  class UserModelService {
    createUser(userId) {
      return userId;
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserEntityService, UserModelService],
    }).compile();

    userEntityService = module.get<UserEntityService>(UserEntityService);
    userModelService = module.get<UserModelService>(UserModelService);
  });

  it('should be defined', () => {
    expect(userEntityService).toBeDefined();
  });

  it('create user', () => {
    const testUserId = 'asdb';

    const spyfn = jest.spyOn(userModelService, 'createUser');

    userEntityService.createUser(testUserId);

    expect(spyfn).toHaveBeenCalledWith(testUserId);
  });
});
