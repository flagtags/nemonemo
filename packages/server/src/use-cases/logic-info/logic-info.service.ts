import { LikeDto } from '@dto/logicInfo/like-dto';
import { UpdateLogicInfoDto } from '@dto/logicInfo/update-logic-info.dto';
import { LogicNotFoundError } from '@errors/logic';
import { LikesHistoryModel } from '@models/likesHisory/likesHistory.model';
import { LogicInfoModel } from '@models/logicInfo/logicInfo.model';
import { TransactionPlugin } from '@models/transactionPlugin';
import { Injectable } from '@nestjs/common';

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
    const { matched: logicMatched } =
      await this.logicInfoModel.findOneLogicInfo({ logicId });

    if (!logicMatched) throw new LogicNotFoundError();

    const { matched: likeHistoryMatched } = await this.likesHistoryModel.hasOne(
      {
        logicId,
        userId,
      },
    );

    const { response, matched } = await this.transactionPlugin.execute(
      async (session) => {
        if (likeHistoryMatched)
          await this.likesHistoryModel.deleteLike({ logicId, userId }, session);
        else
          await this.likesHistoryModel.createLike({ logicId, userId }, session);
        const calculateLikes = likeHistoryMatched
          ? this.logicInfoModel.decreaseLikes
          : this.logicInfoModel.increaseLikes;
        return await calculateLikes({ logicId }, session);
      },
    );
    return response;
  }
}
