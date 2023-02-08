import { Injectable } from '@nestjs/common';
import { LogicModel } from '@models/logic/logic.model';
import { CreateLogicServiceDto } from '@dto/logic/create-logic-service.dto';
import { LogicEntity } from '@entities/logic-entity/logic-entity.service';

@Injectable()
export class LogicService {
  constructor(private readonly logicModel: LogicModel) {}

  createLogic(createLogicServiceDto: CreateLogicServiceDto) {
    const logicEntity = new LogicEntity(createLogicServiceDto);

    return this.logicModel.createLogic(logicEntity);
  }
}
