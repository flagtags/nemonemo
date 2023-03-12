import { Injectable } from '@nestjs/common';
import { LogicInfoModel } from '@models/logicInfo/logicInfo.model';

@Injectable()
export class LogicInfoService {
  constructor(private readonly logicInfoModel: LogicInfoModel) {}

  async increaseViews(logicId) {
    const { response } = await this.logicInfoModel.increaseViews({ logicId });
    return response;
  }

  async increaseLikes(logicId) {
    const { response } = await this.logicInfoModel.increaseLikes({ logicId });
    return response;
  }
}
