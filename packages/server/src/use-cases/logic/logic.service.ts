import { Injectable } from '@nestjs/common';
import { LogicModel } from '@models/logic/logic.model';
import { CreateLogicServiceDto } from '@dto/logic/create-logic-service.dto';
import { LogicEntity } from '@entities/logic-entity/logic-entity.service';
import { FindLogicsDto } from '@dto/logic/find-logics.dto';
import { FindOneLogicDto } from '@dto/logic/find-one-logic.dto';
import { DeleteLogicDto } from '@dto/logic/delete-logic.dto';
import { UpdateLogicDto } from '@dto/logic/update-logic.dto';

@Injectable()
export class LogicService {
  constructor(private readonly logicModel: LogicModel) {}

  async createLogic(createLogicServiceDto: CreateLogicServiceDto) {
    const logicEntity = new LogicEntity(createLogicServiceDto);

    return this.logicModel.createLogic(logicEntity);
  }

  async findOneLogic(findOneLogicDto: FindOneLogicDto) {
    return this.logicModel.findOneLogic(findOneLogicDto);
  }

  async findLogics(findLogicsDto: FindLogicsDto) {
    console.log('findLogicsDto', findLogicsDto);

    return this.logicModel.findLogics(findLogicsDto);
  }

  async deleteLogic(deleteLogicDto: DeleteLogicDto) {
    return this.logicModel.deleteLogic(deleteLogicDto);
  }

  async updateLogic(updateLogicDto: Omit<UpdateLogicDto, 'id'>) {
    return this.logicModel.updateLogic(updateLogicDto);
  }
}
