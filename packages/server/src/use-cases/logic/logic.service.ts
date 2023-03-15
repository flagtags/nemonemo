import { Injectable } from '@nestjs/common';
import { LogicModel } from '@models/logic/logic.model';
import { LogicInfoModel } from '@models/logicInfo/logicInfo.model';
import { CreateLogicServiceDto } from '@dto/logic/create-logic-service.dto';
import { CreateLogicInfoDto } from '@dto/logicInfo/create-logic-info.dto';
import { LogicEntity } from '@entities/logic-entity/logic-entity.service';
import { FindLogicsDto } from '@dto/logic/find-logics.dto';
import { FindOneLogicDto } from '@dto/logic/find-one-logic.dto';
import { DeleteLogicDto } from '@dto/logic/delete-logic.dto';
import { UpdateLogicDto } from '@dto/logic/update-logic.dto';
import { HintCalculatorEntity } from '@entities/hint-calculator-entity/hint-calculator-entity';
import { LogicNotFoundError } from '@errors/logic';

@Injectable()
export class LogicService {
  constructor(
    private readonly logicModel: LogicModel,
    private readonly logicInfoModel: LogicInfoModel,
  ) {}

  async createLogic(createLogicServiceDto: CreateLogicServiceDto) {
    const logicEntity = new LogicEntity(createLogicServiceDto);
    const { response: logicResponse } = await this.logicModel.createLogic(
      logicEntity,
    );
    return logicResponse;
  }

  async findOneLogic(findOneLogicDto: FindOneLogicDto) {
    const { response, matched } = await this.logicModel.findOneLogic(
      findOneLogicDto,
    );

    if (matched === 0) throw new LogicNotFoundError();
    return response;
  }

  async findLogics(findLogicsDto: FindLogicsDto) {
    const { response } = await this.logicModel.findLogics(findLogicsDto);

    return response;
  }

  async deleteLogic(deleteLogicDto: DeleteLogicDto) {
    const { response, matched } = await this.logicModel.deleteLogic(
      deleteLogicDto,
    );

    if (matched === 0) throw new LogicNotFoundError();
    return response;
  }

  async updateLogic(updateLogicDto: Omit<UpdateLogicDto, 'id'>) {
    let updateLogicModelDto;
    if (updateLogicDto.answer) {
      const hints = HintCalculatorEntity.getHints(updateLogicDto.answer);
      updateLogicModelDto = {
        ...updateLogicDto,
        hintRow: hints.row,
        hintColumn: hints.column,
        size: updateLogicDto.answer.length,
      };
    } else {
      updateLogicModelDto = updateLogicDto;
    }

    const { response, matched } = await this.logicModel.updateLogic(
      updateLogicModelDto,
    );

    if (matched === 0) throw new LogicNotFoundError();

    return response;
  }
}
