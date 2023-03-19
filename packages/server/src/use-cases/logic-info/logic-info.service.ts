import { Injectable } from '@nestjs/common';
import { LogicInfoModel } from '@models/logicInfo/logicInfo.model';
import { UpdateLogicInfoDto } from '@dto/logicInfo/update-logic-info.dto';
import { LogicNotFoundError } from '@errors/logic';
import { LikesHistoryModel } from '@models/likesHisory/likesHistory.model';
import { LikeDto } from '@dto/logicInfo/like-dto';
import { TransactionPlugin } from '@models/transactionPlugin';
import { IModelResponse } from '@models/response';

@Injectable()
export class LogicInfoService {
  constructor(
    private readonly logicInfoModel: LogicInfoModel,
    private readonly likesHistoryModel: LikesHistoryModel,
    private readonly transactionPlugin: TransactionPlugin,
  ) {}

  async increaseViews(logicId: UpdateLogicInfoDto['logicId']) {
    const { response, matched } = await this.logicInfoModel.increaseViews({
      logicId,
    });

    if (!matched) throw new LogicNotFoundError();

    return response;
  }

  async toggleLikes({ logicId, userId }: LikeDto) {
    const { matched: likeHistoryMatched } = await this.likesHistoryModel.hasOne(
      {
        logicId,
        userId,
      },
    );
    const { response, matched } = this.transactionPlugin.execute(async () => {
      if (likeHistoryMatched)
        await this.likesHistoryModel.deleteLike({ logicId, userId });
      else await this.likesHistoryModel.createLike({ logicId, userId });

      const calculateLikes = likeHistoryMatched
        ? this.logicInfoModel.decreaseLikes
        : this.logicInfoModel.increaseLikes;

      return await calculateLikes({ logicId });
    });

    if (!matched) throw new LogicNotFoundError();
    return response;
  }
}
