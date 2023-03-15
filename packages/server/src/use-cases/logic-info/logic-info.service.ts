import { Injectable } from '@nestjs/common';
import { LogicInfoModel } from '@models/logicInfo/logicInfo.model';
import { UpdateLogicInfoDto } from '@dto/logicInfo/update-logic-info.dto';
import { LogicNotFoundError } from '@errors/logic';

@Injectable()
export class LogicInfoService {
  constructor(private readonly logicInfoModel: LogicInfoModel) {}

  async increaseViews(logicId: UpdateLogicInfoDto['logicId']) {
    const { response, matched } = await this.logicInfoModel.increaseViews({
      logicId,
    });

    if (!matched) throw new LogicNotFoundError();

    return response;
  }

  async increaseLikes(logicId: UpdateLogicInfoDto['logicId']) {
    const { response, matched } = await this.logicInfoModel.increaseLikes({
      logicId,
    });

    if (!matched) throw new LogicNotFoundError();
    return response;
  }
}
