import { LikeDto } from '@dto/logicInfo/like-dto';
import { UpdateLogicInfoDto } from '@dto/logicInfo/update-logic-info.dto';
import { LogicNotFoundError } from '@errors/logic';
import { LogicInfoModel } from '@models/logicInfo/logicInfo.model';
import { TransactionPlugin } from '@models/transactionPlugin';
import { Test, TestingModule } from '@nestjs/testing';
import { LikesHistoryModel } from '@models/likesHisory/likesHistory.model';
import { LogicInfoService } from './logic-info.service';
import { LogicInfo } from '@models/logicInfo/logicInfo.schema';
import { Document } from 'mongoose';

jest.mock('@models/logicInfo/logicInfo.model');
jest.mock('@models/likesHisory/likesHistory.model');
jest.mock('@models/transactionPlugin');

describe('Logic Info Service', () => {
  let logicInfoService: LogicInfoService;
  let mocekdLogicInfoModel: jest.Mocked<LogicInfoModel>;
  let mockedLikesHistoryModel: jest.Mocked<LikesHistoryModel>;
  let mockedTransactionPlugin: jest.Mocked<TransactionPlugin>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogicInfoService,
        LogicInfoModel,
        TransactionPlugin,
        LikesHistoryModel,
      ],
    }).compile();

    logicInfoService = module.get<LogicInfoService>(LogicInfoService);
    const logicInfoModel = module.get<LogicInfoModel>(LogicInfoModel);
    const likesHistoryModel = module.get<LikesHistoryModel>(LikesHistoryModel);
    const transactionPlugin = module.get<TransactionPlugin>(TransactionPlugin);
    mocekdLogicInfoModel = jest.mocked(logicInfoModel, true);
    mockedLikesHistoryModel = jest.mocked(likesHistoryModel, true);
    mockedTransactionPlugin = jest.mocked(transactionPlugin, true);

    mockedTransactionPlugin.execute.mockImplementation((callback) => {
      return callback(null);
    });
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
      mockedLikesHistoryModel.hasOne.mockResolvedValue({
        matched: 0,
        response: false,
      });

      mocekdLogicInfoModel.findOneLogicInfo.mockResolvedValue({
        matched: 1,
        response: {} as any,
      });

      const updateLogicInfoDto: LikeDto = {
        logicId: 'asdf',
        userId: 'asdf',
      };

      mocekdLogicInfoModel.increaseLikes.mockResolvedValue({
        response: 1,
        matched: 1,
      });

      await logicInfoService.toggleLikes(updateLogicInfoDto);

      expect(mocekdLogicInfoModel.increaseLikes).toHaveBeenCalledWith(
        { logicId: 'asdf' },
        null, // session 대신
      );

      expect(mocekdLogicInfoModel.decreaseLikes).not.toHaveBeenCalledWith(
        { logicId: 'asdf' },
        null, // session 대신
      );
    });

    test('likes decrement 1: 클릭 이력이 있는 경우', async () => {
      mockedLikesHistoryModel.hasOne.mockResolvedValue({
        response: true,
        matched: 1,
      });

      mocekdLogicInfoModel.findOneLogicInfo.mockResolvedValue({
        matched: 1,
        response: {} as any,
      });

      const updateLogicInfoDto: LikeDto = {
        logicId: 'asdf',
        userId: 'asdf',
      };

      mocekdLogicInfoModel.decreaseLikes.mockResolvedValue({
        response: 1,
        matched: 1,
      });

      await logicInfoService.toggleLikes(updateLogicInfoDto);

      expect(mocekdLogicInfoModel.increaseLikes).not.toHaveBeenCalledWith(
        { logicId: 'asdf' },
        null,
      );

      expect(mocekdLogicInfoModel.decreaseLikes).toHaveBeenCalledWith(
        { logicId: 'asdf' },
        null,
      );
    });

    test('없는 logicId 일 때', async () => {
      mockedLikesHistoryModel.hasOne.mockResolvedValue({
        response: false,
        matched: 0,
      });

      mocekdLogicInfoModel.findOneLogicInfo.mockResolvedValue({
        matched: 0,
        response: {} as any,
      });

      const updateLogicInfoDto: LikeDto = {
        logicId: 'asdf',
        userId: 'asdf',
      };

      mocekdLogicInfoModel.increaseLikes.mockResolvedValue({
        response: 0,
        matched: 0,
      });

      await expect(async () =>
        logicInfoService.toggleLikes(updateLogicInfoDto),
      ).rejects.toThrowError(new LogicNotFoundError());
    });
  });
});
