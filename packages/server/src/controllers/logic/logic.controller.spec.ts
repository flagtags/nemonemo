import { FindLogicsDto } from '@dto/logic/find-logics.dto';
import { FindOneLogicDto } from '@dto/logic/find-one-logic.dto';
import { UpdateLogicDto } from '@dto/logic/update-logic.dto';
import { CreateLogicServiceDto } from '@dto/logic/create-logic-service.dto';
import { DeleteLogicDto } from '@dto/logic/delete-logic.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { Logic } from '@models/logic/logic.schema';
import { LogicController } from './logic.controller';
import { LogicService } from '@use-cases/logic/logic.service';

class LogicServiceMock {
  async createLogic(createLogicDto: CreateLogicServiceDto): Promise<Logic> {
    return {} as Logic;
  }

  async findLogics(findLogicDto: FindLogicsDto): Promise<Logic[]> {
    return {} as Logic[];
  }

  async findOneLogic(findOneLogicDto: FindOneLogicDto): Promise<Logic> {
    return {} as Logic;
  }

  async updateLogic(updateLogicDto: UpdateLogicDto): Promise<boolean> {
    return true;
  }

  async deleteLogic(deleteLogicDto: DeleteLogicDto): Promise<boolean> {
    return true;
  }
}

describe('로직 서비스', () => {
  let controller: LogicController;
  let logicService: LogicServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogicController,
        {
          provide: LogicService,
          useClass: LogicServiceMock,
        },
      ],
    }).compile();

    controller = module.get<LogicController>(LogicController);
    logicService = module.get<LogicService>(LogicService);
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

    const createLogicSpyfn = jest.spyOn(logicService, 'createLogic');

    await controller.createLogic(createLogicDto);

    expect(createLogicSpyfn).toHaveBeenCalledWith(createLogicDto);
  });

  test('로직 제공', async () => {
    const findOneLogicDto = {
      _id: '_id',
    };

    const findOneLogicSpyfn = jest.spyOn(logicService, 'findOneLogic');
    const mockedLogic = {} as Logic;
    findOneLogicSpyfn.mockResolvedValue(mockedLogic);

    const logic = await controller.findOneLogic('_id');

    expect(findOneLogicSpyfn).toHaveBeenCalledWith(findOneLogicDto);
    expect(logic).toEqual(mockedLogic);
  });

  test('로직 삭제', async () => {
    const deleteLogicDto = {
      _id: '_id',
    };

    const deleteLogicSpyfn = jest.spyOn(logicService, 'deleteLogic');

    await controller.deleteLogic('_id');

    expect(deleteLogicSpyfn).toHaveBeenCalledWith(deleteLogicDto);
  });

  test('로직 목록 요청', async () => {
    const findLogicsDto: FindLogicsDto = {
      pageIndex: 1,
      pageSize: 3,
    };
    const findLogicSpyfn = jest.spyOn(logicService, 'findLogics');
    findLogicSpyfn.mockResolvedValue([{}, {}] as Logic[]);

    const logics = await controller.findLogics(
      findLogicsDto.pageIndex,
      findLogicsDto.pageSize,
    );

    expect(findLogicSpyfn).toHaveBeenCalledWith(findLogicsDto);
    expect(logics).toEqual([{}, {}]);
  });

  test('제한시간 수정', async () => {
    const updateLogicDto: UpdateLogicDto = {
      _id: '_id',
      timeLimit: 240,
    };

    const updateLogicSpyfn = jest.spyOn(logicService, 'updateLogic');

    await controller.updateLogic('_id', updateLogicDto);

    expect(updateLogicSpyfn).toHaveBeenCalledWith(updateLogicDto);
  });
});
