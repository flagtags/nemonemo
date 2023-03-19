import { LikeDto } from '@dto/logicInfo/like-dto';
import { IModelResponse } from '@models/response';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { LikesHistory, LikesHistoryDocument } from './likesHistory.schema';

@Injectable()
export class LikesHistoryModel {
  constructor(
    @InjectModel(LikesHistory.name)
    private likeHistorySchema: Model<LikesHistory>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async hasOne(hasOneDto: LikeDto): Promise<IModelResponse<boolean>> {
    const res = await this.likeHistorySchema
      .findOne({ logicId: hasOneDto.logicId, userId: hasOneDto.userId })
      .exec();
    return {
      response: !!res,
      matched: res ? 1 : 0,
    };
  }

  async createLike(
    likeDto: LikeDto,
  ): Promise<IModelResponse<LikesHistoryDocument>> {
    const likeHistory = await new this.likeHistorySchema(likeDto).save();

    return {
      response: likeHistory,
    };
  }

  async deleteLike(likeDto: LikeDto): Promise<IModelResponse<number>> {
    const res = await this.likeHistorySchema.deleteOne(likeDto).exec();

    return {
      response: res.deletedCount,
      matched: res.deletedCount,
      affected: res.deletedCount,
    };
  }
}
