import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { filterEmptyObjectField } from '@utils/index';
import { FindLogicsDto } from '@dto/logic/find-logics.dto';
import { FindOneLogicDto } from '@dto/logic/find-one-logic.dto';
import { UpdateLogicDto } from '@dto/logic/update-logic.dto';
import { CreateLogicModelDto } from '@dto/logic/create-logic-model.dto';
import { DeleteLogicDto } from '@dto/logic/delete-logic.dto';
import { Logic, LogicDocmuent } from './logic.schema';

@Injectable()
export class LogicModel {
  constructor(@InjectModel(Logic.name) private logicSchema: Model<Logic>) {}

  findLogics(findLogicDto: FindLogicsDto): Promise<LogicDocmuent[]> {
    const { pageSize, pageIndex } = findLogicDto;
    const skipNum = pageSize * (pageIndex - 1);

    return this.logicSchema.find().limit(pageSize).skip(skipNum).exec();
  }

  findOneLogic(findOneLogicDto: FindOneLogicDto): Promise<LogicDocmuent> {
    return this.logicSchema.findOne({ id: findOneLogicDto._id }).exec();
  }

  createLogic(createLogicDto: CreateLogicModelDto): Promise<LogicDocmuent> {
    const logicDocument = new this.logicSchema(createLogicDto);
    const logic = logicDocument.save();

    return logic;
  }

  async updateLogic(
    updateLogicDto: Omit<UpdateLogicDto, 'id'>,
  ): Promise<boolean> {
    const { _id, ...restUpdatedLogicDto } = updateLogicDto;

    const filteredRestUpdateLogicDto =
      filterEmptyObjectField(restUpdatedLogicDto);

    const res = await this.logicSchema.updateOne(
      { _id: updateLogicDto._id },
      { $set: filteredRestUpdateLogicDto },
    );

    if (res.matchedCount === 0) throw new Error('logic not found');

    return true;
  }

  async deleteLogic(removeLogicDto: DeleteLogicDto): Promise<boolean> {
    const res = await this.logicSchema
      .deleteOne({ _id: removeLogicDto._id })
      .exec();

    if (res.deletedCount === 0) throw new Error('logic not found');
    return true;
  }
}
