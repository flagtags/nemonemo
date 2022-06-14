import { Test, TestingModule } from '@nestjs/testing';
import { UserEntityService } from './user-entity.service';

describe('UserEntityService', () => {
  let service: UserEntityService;

  class UserModelService {
    createUser (userId){
      return userId;
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserEntityService, UserModelService],
    }).compile();

    service = module.get<UserEntityService>(UserEntityService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create user', () => {
    const testUserId = 'asdb'

    const spyfn = jest.spyOn(UserModelService, 'createUser').getMockImplementation()

    expect(service.createUser(testUserId))
  })
});

