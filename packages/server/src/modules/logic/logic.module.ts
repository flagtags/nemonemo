import { LogicController } from '@controllers/logic/logic.controller';
import { LogicModel } from '@models/logic/logic.model';
import { Logic, LogicSchema } from '@models/logic/logic.schema';
import { LogicInfoModel } from '@models/logicInfo/logicInfo.model';
import { LogicInfo, LogicInfoSchema } from '@models/logicInfo/logicInfo.schema';
import { TransactionPlugin } from '@models/transactionPlugin';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogicService } from '@use-cases/logic/logic.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Logic.name, schema: LogicSchema },
      { name: LogicInfo.name, schema: LogicInfoSchema },
    ]),
  ],
  controllers: [LogicController],
  providers: [LogicService, LogicModel, LogicInfoModel, TransactionPlugin],
})
export class LogicModule {}
