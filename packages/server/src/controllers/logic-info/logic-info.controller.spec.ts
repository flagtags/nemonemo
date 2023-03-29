import { UpdateLogicInfoDto } from '@dto/logicInfo/update-logic-info.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { LogicInfoService } from '@use-cases/logic-info/logic-info.service';
import { LogicInfoController } from './logic-info.controller';
import { LikeDto } from '@dto/logicInfo/like-dto';
import { AuthGuard } from '@guards/authGuard';

jest.mock('@use-cases/logic-info/logic-info.service');
jest.mock('@guards/authGuard');

describe('로직 서비스', () => {
  let controller: LogicInfoController;
  let mockedLogicInfoService: jest.Mocked<LogicInfoService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogicInfoController, LogicInfoService, AuthGuard],
    }).compile();

    controller = module.get<LogicInfoController>(LogicInfoController);
    const logicInfoService = module.get<LogicInfoService>(LogicInfoService);
    mockedLogicInfoService = jest.mocked(logicInfoService, true);
  });

  test('좋아요 늘리기', async () => {
    const likeDto: LikeDto = {
      logicId: '_id',
      userId: '_id',
    };

    await controller.toggleLikes(likeDto);

    expect(mockedLogicInfoService.toggleLikes).toHaveBeenCalledWith(likeDto);
  });

  test('조회수 늘리기', async () => {
    const logicId: UpdateLogicInfoDto['logicId'] = '_id';

    await controller.increaseViews('_id');

    expect(mockedLogicInfoService.increaseViews).toHaveBeenCalledWith(logicId);
  });
});
