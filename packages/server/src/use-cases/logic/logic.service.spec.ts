import { FindLogicsDto } from '@dto/logic/find-logics.dto';
import { FindOneLogicDto } from '@dto/logic/find-one-logic.dto';
import { UpdateLogicDto } from '@dto/logic/update-logic.dto';
import { CreateLogicServiceDto } from '@dto/logic/create-logic-service.dto';
import { DeleteLogicDto } from '@dto/logic/delete-logic.dto';
import { LogicInfoModel } from '@models/logicInfo/logicInfo.model';
import { Test, TestingModule } from '@nestjs/testing';
import { LogicEntity } from '@entities/logic-entity/logic-entity.service';
import { LogicModel } from '@models/logic/logic.model';
import { Logic, LogicDocmuent } from '@models/logic/logic.schema';
import { LogicService } from './logic.service';
import { LogicEntityDto } from '@dto/logic/logic-entity.dto';
import { LogicNotFoundError } from '@errors/logic';
import { IModelResponse } from '@models/response';
import { getConnectionToken } from '@nestjs/mongoose';
import { TransactionPlugin } from '@models/transactionPlugin';

jest.mock('@models/logicInfo/logicInfo.model');
jest.mock('@models/transactionPlugin');

class LogicModelMock {
  async createLogic(
    createLogicDto: CreateLogicServiceDto,
  ): Promise<IModelResponse<LogicDocmuent>> {
    return {
      response: {} as LogicDocmuent,
    };
  }

  async findLogics(
    findLogicDto: FindLogicsDto,
  ): Promise<IModelResponse<LogicDocmuent[]>> {
    return { response: [] };
  }

  async findOneLogic(
    findOneLogicDto: FindOneLogicDto,
  ): Promise<IModelResponse<LogicDocmuent>> {
    return { response: {} as LogicDocmuent };
  }

  async updateLogic(
    updateLogicDto: UpdateLogicDto,
  ): Promise<IModelResponse<number>> {
    return { response: 0 };
  }

  async deleteLogic(
    deleteLogicDto: DeleteLogicDto,
  ): Promise<IModelResponse<number>> {
    return { response: 0 };
  }
}

describe('로직 서비스', () => {
  let service: LogicService;
  let logicModel: LogicModelMock;
  let mocekdLogicInfoModel: jest.Mocked<LogicInfoModel>;
  let mockedTransactionPlugin: jest.Mocked<TransactionPlugin>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogicService,
        {
          provide: LogicModel,
          useClass: LogicModelMock,
        },
        {
          provide: getConnectionToken('DB'),
          useValue: {},
        },
        LogicInfoModel,
        TransactionPlugin,
      ],
    }).compile();

    service = module.get<LogicService>(LogicService);
    logicModel = module.get<LogicModelMock>(LogicModel);
    const logicInfoModel = module.get<LogicInfoModel>(LogicInfoModel);
    mocekdLogicInfoModel = jest.mocked(logicInfoModel, true);
    const transactionPlugin = module.get<TransactionPlugin>(TransactionPlugin);
    mockedTransactionPlugin = jest.mocked(transactionPlugin, true);
  });

  test('로직 제작', async () => {
    const createLogicDto: CreateLogicServiceDto = {
      answer: [
        [true, false, true],
        [false, false, true],
        [true, true, true],
      ],
      timeLimit: 6000,
      title: 'test',
      authorId: '1',
    };

    const mockedLogic = {
      response: {
        _id: '_id',
      } as LogicDocmuent,
    };

    const logicEntity: LogicEntity = new LogicEntity(createLogicDto);
    const createLogicSpyfn = jest.spyOn(logicModel, 'createLogic');

    mockedTransactionPlugin.execute.mockImplementation(async (callback) => {
      return callback(null);
    });

    await service.createLogic(createLogicDto);

    expect(createLogicSpyfn).toHaveBeenCalledWith(logicEntity, null);
  });

  describe('로직 제공', () => {
    test('로직이 있을 때', async () => {
      const findOneLogicDto = {
        _id: '_id',
      };

      const findOneLogicSpyfn = jest.spyOn(logicModel, 'findOneLogic');
      const mockedLogic = {
        response: {
          _id: '_id',
        } as LogicDocmuent,
      };
      findOneLogicSpyfn.mockResolvedValue(mockedLogic);

      const logic = await service.findOneLogic(findOneLogicDto);

      expect(findOneLogicSpyfn).toHaveBeenCalledWith(findOneLogicDto);
      expect(logic).toEqual({ _id: '_id' });
    });

    test('로직이 없을 때', async () => {
      const findOneLogicDto = {
        _id: '_id',
      };

      const findOneLogicSpyfn = jest.spyOn(logicModel, 'findOneLogic');
      const mockedLogic = { response: null as LogicDocmuent, matched: 0 };
      findOneLogicSpyfn.mockResolvedValue(mockedLogic);

      expect(async () => service.findOneLogic(findOneLogicDto)).rejects.toThrow(
        new LogicNotFoundError(),
      );
    });
  });

  describe('로직 삭제', () => {
    test('성공', async () => {
      const deleteLogicDto = {
        _id: '_id',
      };

      const deleteLogicSpyfn = jest.spyOn(logicModel, 'deleteLogic');

      await service.deleteLogic(deleteLogicDto);

      expect(deleteLogicSpyfn).toHaveBeenCalledWith(deleteLogicDto);
    });
  });

  test('로직 목록 요청', async () => {
    const findLogicsDto: FindLogicsDto = {
      pageIndex: 1,
      pageSize: 3,
    };
    const findLogicSpyfn = jest.spyOn(logicModel, 'findLogics');
    findLogicSpyfn.mockResolvedValue({ response: [{}, {}] as LogicDocmuent[] });

    const logics = await service.findLogics(findLogicsDto);

    expect(findLogicSpyfn).toHaveBeenCalledWith(findLogicsDto);
    expect(logics).toEqual([{}, {}]);
  });

  describe('로직 수정', () => {
    test('제한시간 수정', async () => {
      const updateLogicDto: UpdateLogicDto = {
        _id: '_id',
        timeLimit: 240,
      };

      const updateLogicSpyfn = jest.spyOn(logicModel, 'updateLogic');

      await service.updateLogic(updateLogicDto);

      expect(updateLogicSpyfn).toHaveBeenCalledWith(updateLogicDto);
    });

    test('업데이트 로직할 때 hintRow, hintColumn, answer 다시 계산', async () => {
      const updateLogicDto: UpdateLogicDto = {
        _id: '_id',
        answer: [
          [true, true, false],
          [true, true, false],
          [true, true, false],
        ],
      };

      const updateLogicSpyfn = jest.spyOn(logicModel, 'updateLogic');

      await service.updateLogic(updateLogicDto);

      const answer = {
        ...updateLogicDto,
        hintRow: [[2], [2], [2]],
        hintColumn: [[3], [3], []],
        size: 3,
      };

      expect(updateLogicSpyfn).toHaveBeenCalledWith(answer);
    });
  });
});

// TODO: 로직 수정 테스트
test('잘못된 authorId를 넣으려고 하는 경우', () => {
  // 인증 모듈을 만들고 수정
});
