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

class LogicModelMock {
  async createLogic(
    createLogicDto: CreateLogicServiceDto,
  ): Promise<LogicDocmuent> {
    return {} as LogicDocmuent;
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

});
