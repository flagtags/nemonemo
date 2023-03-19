import { LogicInfoController } from '@controllers/logic-info/logic-info.controller';
import { LikesHistoryModel } from '@models/likesHisory/likesHistory.model';
import { LogicInfoModel } from '@models/logicInfo/logicInfo.model';
import { LogicInfo, LogicInfoSchema } from '@models/logicInfo/logicInfo.schema';
import { TransactionPlugin } from '@models/transactionPlugin';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogicInfoService } from '@use-cases/logic-info/logic-info.service';
import {
  LikesHistory,
  LikesHistorySchema,
} from '@models/likesHisory/likesHistory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LogicInfo.name, schema: LogicInfoSchema },
      { name: LikesHistory.name, schema: LikesHistorySchema },
    ]),
  ],
  controllers: [LogicInfoController],
  providers: [
    LogicInfoService,
    LogicInfoModel,
    TransactionPlugin,
    LikesHistoryModel,
  ],
})
export class LogicInfoModule {}
