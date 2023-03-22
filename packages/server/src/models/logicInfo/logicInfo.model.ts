import { CreateLogicInfoDto } from '@dto/logicInfo/create-logic-info.dto';
import { DeleteLogicInfoDto } from '@dto/logicInfo/delete-logic-info.dto';
import { FindOneLogicInfoDto } from '@dto/logicInfo/findOneLogicInfo.dto';
import { UpdateLogicInfoDto } from '@dto/logicInfo/update-logic-info.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { filterEmptyObjectField } from '@utils/index';
import { Model, ClientSession } from 'mongoose';
import { LogicInfo } from './logicInfo.schema';

@Injectable()
export class LogicInfoModel {
  constructor(
    @InjectModel(LogicInfo.name) private logicInfoSchema: Model<LogicInfo>,
  ) {}

  async createLogicInfo(
    createLogicInfoDto: CreateLogicInfoDto,
    session?: ClientSession,
  ) {
    const logicInfoDocument = new this.logicInfoSchema(createLogicInfoDto);
    const logicInfo = await logicInfoDocument.save({ session });

    return { response: logicInfo };
  }

  async findOneLogicInfo(findOneLogicDto: FindOneLogicInfoDto) {
    const res = await this.logicInfoSchema
      .findOne({ logicId: findOneLogicDto.logicId })
      .exec();

    return {
      response: res,
      matched: res ? 1 : 0,
    };
  }

  async updateLogicInfo(updateLogicInfoDto: UpdateLogicInfoDto) {
    const { logicId, ...restUpdatedLogicInfoDto } = updateLogicInfoDto;

    const filteredRestUpdateLogicIdDto = filterEmptyObjectField(
      restUpdatedLogicInfoDto,
    );

    const res = await this.logicInfoSchema.updateOne(
      { logicId: logicId },
      { $set: filteredRestUpdateLogicIdDto },
    );

    return {
      response: res.modifiedCount,
      match: res.matchedCount,
    };
  }

  async deleteLogicInfo(removeLogicInfoDto: DeleteLogicInfoDto) {
    const res = await this.logicInfoSchema
      .deleteOne({ logicId: removeLogicInfoDto.logicId })
      .exec();

    return {
      response: res.deletedCount,
      matched: res.deletedCount,
      affected: res.deletedCount,
    };
  }

  async increaseViews(updateLogicInfoDto: UpdateLogicInfoDto) {
    const res = await this.logicInfoSchema.updateOne(
      { logicId: updateLogicInfoDto.logicId },
      {
        $inc: { views: 1 },
      },
    );

    return {
      response: res.modifiedCount,
      matched: res.matchedCount,
    };
  }

  async increaseLikes(updateLogicInfoDto: UpdateLogicInfoDto) {
    const res = await this.logicInfoSchema.updateOne(
      { logicId: updateLogicInfoDto.logicId },
      {
        $inc: { likes: 1 },
      },
    );

    return {
      response: res.modifiedCount,
      matched: res.matchedCount,
    };
  }

  async decreaseLikes(updateLogicInfoDto: UpdateLogicInfoDto) {
    const res = await this.logicInfoSchema.updateOne(
      { logicId: updateLogicInfoDto.logicId },
      {
        $inc: { likes: -1 },
      },
    );

    return {
      response: res.modifiedCount,
      matched: res.matchedCount,
    };
  }
}
