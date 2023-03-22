import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection, ClientSession } from 'mongoose';
import { filterEmptyObjectField } from '@utils/index';
import { FindLogicsDto } from '@dto/logic/find-logics.dto';
import { FindOneLogicDto } from '@dto/logic/find-one-logic.dto';
import { UpdateLogicDto } from '@dto/logic/update-logic.dto';
import { CreateLogicModelDto } from '@dto/logic/create-logic-model.dto';
import { DeleteLogicDto } from '@dto/logic/delete-logic.dto';
import { Logic, LogicDocmuent } from './logic.schema';
import { LogicInfoModel } from '@models/logicInfo/logicInfo.model';
import { LogicNotFoundError } from '@errors/logic';
import { IModelResponse } from '@models/response';
import { CreateLogicInfoDto } from '@dto/logicInfo/create-logic-info.dto';

@Injectable()
export class LogicModel {
  constructor(
    @InjectModel(Logic.name) private logicSchema: Model<Logic>,
    private readonly logicInfoModel: LogicInfoModel,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async findLogics(
    findLogicDto: FindLogicsDto,
  ): Promise<IModelResponse<LogicDocmuent[]>> {
    const { pageSize, pageIndex } = findLogicDto;
    const skipNum = pageSize * pageIndex;

    const res = await this.logicSchema
      .find()
      .limit(pageSize)
      .skip(skipNum)
      .exec();

    return {
      response: res,
      matched: res.length,
    };
  }

  async findOneLogic(
    findOneLogicDto: FindOneLogicDto,
  ): Promise<IModelResponse<LogicDocmuent>> {
    const res = await this.logicSchema
      .findOne({ _id: findOneLogicDto._id })
      .exec();
    return {
      response: res,
      matched: res ? 1 : 0,
    };
  }

  async createLogic(
    createLogicDto: CreateLogicModelDto,
    session?: ClientSession,
  ): Promise<IModelResponse<LogicDocmuent>> {
    const logicDocument = new this.logicSchema(createLogicDto);
    const logic = await logicDocument.save({ session });

    return {
      response: logic,
    };
  }

  async updateLogic(
    updateLogicDto: Omit<UpdateLogicDto, 'id'>,
  ): Promise<IModelResponse<number>> {
    const { _id, ...restUpdatedLogicDto } = updateLogicDto;

    const filteredRestUpdateLogicDto =
      filterEmptyObjectField(restUpdatedLogicDto);

    const res = await this.logicSchema.updateOne(
      { _id: updateLogicDto._id },
      { $set: filteredRestUpdateLogicDto },
    );

    return {
      response: res.modifiedCount,
      matched: res.matchedCount,
    };
  }

  async deleteLogic(
    removeLogicDto: DeleteLogicDto,
  ): Promise<IModelResponse<number>> {
    const res = await this.logicSchema
      .deleteOne({ _id: removeLogicDto._id })
      .exec();

    return {
      response: res.deletedCount,
      matched: res.deletedCount,
      affected: res.deletedCount,
    };
  }
}
