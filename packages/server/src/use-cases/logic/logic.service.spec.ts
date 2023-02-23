import { FindLogicsDto } from '@dto/logic/find-logics.dto';
import { FindOneLogicDto } from '@dto/logic/find-one-logic.dto';
import { UpdateLogicDto } from '@dto/logic/update-logic.dto';
import { CreateLogicServiceDto } from '@dto/logic/create-logic-service.dto';
import { DeleteLogicDto } from '@dto/logic/delete-logic.dto';

import { Test, TestingModule } from '@nestjs/testing';
import { LogicEntity } from '@entities/logic-entity/logic-entity.service';
import { LogicModel } from '@models/logic/logic.model';
import { Logic, LogicDocmuent } from '@models/logic/logic.schema';
import { LogicService } from './logic.service';
import { LogicEntityDto } from '@dto/logic/logic-entity.dto';
import { LogicNotFoundError } from '@errors/logic';

class LogicModelMock {
  async createLogic(
    createLogicDto: CreateLogicServiceDto,
  ): Promise<LogicDocmuent> {
    return {} as LogicDocmuent;
  }

  async findLogics(findLogicDto: FindLogicsDto): Promise<LogicDocmuent[]> {
    return {} as LogicDocmuent[];
  }

  async findOneLogic(findOneLogicDto: FindOneLogicDto): Promise<LogicDocmuent> {
    return {} as LogicDocmuent;
  }

  async updateLogic(updateLogicDto: UpdateLogicDto): Promise<boolean> {
    return true;
  }

  async deleteLogic(deleteLogicDto: DeleteLogicDto): Promise<boolean> {
    return true;
  }
}

describe('로직 서비스', () => {
  let service: LogicService;
  let logicModel: LogicModelMock;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogicService,
        {
          provide: LogicModel,
          useClass: LogicModelMock,
        },
      ],
    }).compile();

    service = module.get<LogicService>(LogicService);
    logicModel = module.get<LogicModelMock>(LogicModel);
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

    const logicEntity: LogicEntity = new LogicEntity(createLogicDto);

    const createLogicSpyfn = jest.spyOn(logicModel, 'createLogic');

    await service.createLogic(createLogicDto);

    expect(createLogicSpyfn).toHaveBeenCalledWith(logicEntity);
  });

  test('로직 제공', async () => {
    const findOneLogicDto = {
      _id: '_id',
    };

    const findOneLogicSpyfn = jest.spyOn(logicModel, 'findOneLogic');
    const mockedLogic = {} as LogicDocmuent;
    findOneLogicSpyfn.mockResolvedValue(mockedLogic);

    const logic = await service.findOneLogic(findOneLogicDto);

    expect(findOneLogicSpyfn).toHaveBeenCalledWith(findOneLogicDto);
    expect(logic).toEqual(mockedLogic);
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
    findLogicSpyfn.mockResolvedValue([{}, {}] as LogicDocmuent[]);

    const logics = await service.findLogics(findLogicsDto);

    expect(findLogicSpyfn).toHaveBeenCalledWith(findLogicsDto);
    expect(logics).toEqual([{}, {}]);
  });

  test('제한시간 수정', async () => {
    const updateLogicDto: UpdateLogicDto = {
      _id: '_id',
      timeLimit: 240,
    };

    const updateLogicSpyfn = jest.spyOn(logicModel, 'updateLogic');

    await service.updateLogic(updateLogicDto);

    expect(updateLogicSpyfn).toHaveBeenCalledWith(updateLogicDto);
  });
});

// TODO: 로직 수정 테스트
test('잘못된 authorId를 넣으려고 하는 경우', () => {}); // 인증 모듈을 만들고 수정?

test('업데이트 로직할 때 hintRow, hintColumn 다시 계산', () => {});
