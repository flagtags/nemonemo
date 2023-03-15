import { Test, TestingModule } from '@nestjs/testing';
import { LogicInfoModel } from '@models/logicInfo/logicInfo.model';
import { LogicInfoService } from './logic-info.service';
import { UpdateLogicInfoDto } from '@dto/logicInfo/update-logic-info.dto';
import { LogicNotFoundError } from '@errors/logic';

jest.mock('@models/logicInfo/logicInfo.model');

describe('Logic Info Service', () => {
  let logicInfoService: LogicInfoService;
  let mocekdLogicInfoModel: jest.Mocked<LogicInfoModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogicInfoService, LogicInfoModel],
    }).compile();

    logicInfoService = module.get<LogicInfoService>(LogicInfoService);
    const logicInfoModel = module.get<LogicInfoModel>(LogicInfoModel);
    mocekdLogicInfoModel = jest.mocked(logicInfoModel, true);
  });

  describe('Views increment 1', () => {
    test('views increment 1', async () => {
      const updateLogicInfoDto: UpdateLogicInfoDto = {
        logicId: 'asdf',
      };
      mocekdLogicInfoModel.increaseViews.mockResolvedValue({
        response: 1,
        matched: 1,
      });

      await logicInfoService.increaseViews(updateLogicInfoDto.logicId);

      expect(mocekdLogicInfoModel.increaseViews).toHaveBeenCalledWith(
        updateLogicInfoDto,
      );
    });

    test('없는 logicId 일 때', async () => {
      const updateLogicInfoDto: UpdateLogicInfoDto = {
        logicId: 'asdf',
      };

      mocekdLogicInfoModel.increaseViews.mockResolvedValue({
        response: 0,
        matched: 0,
      });

      await expect(async () =>
        logicInfoService.increaseViews(updateLogicInfoDto.logicId),
      ).rejects.toThrowError(new LogicNotFoundError());
    });
  });

  describe('likes increment 1', () => {
    test('likes increment 1', async () => {
      const updateLogicInfoDto: UpdateLogicInfoDto = {
        logicId: 'asdf',
      };

      mocekdLogicInfoModel.increaseLikes.mockResolvedValue({
        response: 1,
        matched: 1,
      });

      await logicInfoService.increaseLikes(updateLogicInfoDto.logicId);

      expect(mocekdLogicInfoModel.increaseLikes).toHaveBeenCalledWith(
        updateLogicInfoDto,
      );
    });

    test('없는 logicId 일 때', async () => {
      const updateLogicInfoDto: UpdateLogicInfoDto = {
        logicId: 'asdf',
      };

      mocekdLogicInfoModel.increaseLikes.mockResolvedValue({
        response: 0,
        matched: 0,
      });

      await expect(async () =>
        logicInfoService.increaseLikes(updateLogicInfoDto.logicId),
      ).rejects.toThrowError(new LogicNotFoundError());
    });
  });
});
