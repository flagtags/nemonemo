import { FindLogicsDto } from '@dto/logic/find-logics.dto';
import { FindOneLogicDto } from '@dto/logic/find-one-logic.dto';
import { UpdateLogicDto } from '@dto/logic/update-logic.dto';
import { CreateLogicServiceDto } from '@dto/logic/create-logic-service.dto';
import { DeleteLogicDto } from '@dto/logic/delete-logic.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { LogicInfo } from '@models/logicInfo/logicInfo.schema';
import { LogicInfoController } from './logic-info.controller';
import { LogicInfoService } from '@use-cases/logic-info/logic-info.service';
import { UpdateLogicInfoDto } from '@dto/logicInfo/update-logic-info.dto';

jest.mock('@use-cases/logic-info/logic-info.service');

describe('로직 서비스', () => {
  let controller: LogicInfoController;
  let mockedLogicInfoService: jest.Mocked<LogicInfoService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogicInfoController, LogicInfoService],
    }).compile();

    controller = module.get<LogicInfoController>(LogicInfoController);
    const logicInfoService = module.get<LogicInfoService>(LogicInfoService);
    mockedLogicInfoService = jest.mocked(logicInfoService, true);
  });

  test('좋아요 늘리기', async () => {
    const logicId: UpdateLogicInfoDto['logicId'] = '_id';

    await controller.increaseLikes('_id');

    expect(mockedLogicInfoService.increaseLikes).toHaveBeenCalledWith(logicId);
  });
});
