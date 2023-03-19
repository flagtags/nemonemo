import { UpdateLogicInfoDto } from '@dto/logicInfo/update-logic-info.dto';
import { LogicNotFoundError } from '@errors/logic';
import { LikesHistoryModel } from '@models/likesHisory/likesHistory.model';
import { LogicInfoModel } from '@models/logicInfo/logicInfo.model';
import { Test, TestingModule } from '@nestjs/testing';
import { LogicInfoService } from './logic-info.service';

jest.mock('@models/logicInfo/logicInfo.model');
jest.mock('@models/likesHistory/likesHistory.model');

describe('Logic Info Service', () => {
  let logicInfoService: LogicInfoService;
  let mocekdLogicInfoModel: jest.Mocked<LogicInfoModel>;
  let mockedLikesHistoryModel: jest.Mocked<LikesHistoryModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogicInfoService, LogicInfoModel],
    }).compile();

    logicInfoService = module.get<LogicInfoService>(LogicInfoService);
    const logicInfoModel = module.get<LogicInfoModel>(LogicInfoModel);
    const likesHistoryModel = module.get<LikesHistoryModel>(LikesHistoryModel);
    mocekdLogicInfoModel = jest.mocked(logicInfoModel, true);
    mockedLikesHistoryModel = jest.mocked(likesHistoryModel, true);
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

  describe('likes toggle', () => {
    test('likes increment 1: 클릭 이력이 없는 경우', async () => {
      const hasHistory = mockedLikesHistoryModel.hasOne.mockResolvedValue({
        response: false,
      });

      const updateLogicInfoDto: UpdateLogicInfoDto = {
        logicId: 'asdf',
      };

      await logicInfoService.toggleLikes(updateLogicInfoDto.logicId);

      expect(mocekdLogicInfoModel.increaseLikes).toHaveBeenCalledWith(
        updateLogicInfoDto,
      );

      expect(mocekdLogicInfoModel.decreaseLikes).not.toHaveBeenCalledWith(
        updateLogicInfoDto,
      );
    });

    test('likes decrement 1: 클릭 이력이 있는 경우', async () => {
      const hasHistory = mockedLikesHistoryModel.hasOne.mockResolvedValue({
        response: false,
      });

      const updateLogicInfoDto: UpdateLogicInfoDto = {
        logicId: 'asdf',
      };

      await logicInfoService.toggleLikes(updateLogicInfoDto.logicId);

      expect(mocekdLogicInfoModel.increaseLikes).not.toHaveBeenCalledWith(
        updateLogicInfoDto,
      );

      expect(mocekdLogicInfoModel.decreaseLikes).toHaveBeenCalledWith(
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
        logicInfoService.toggleLikes(updateLogicInfoDto.logicId),
      ).rejects.toThrowError(new LogicNotFoundError());
    });
  });
});
