import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogicInfo, LogicInfoSchema } from '@models/logicInfo/logicInfo.schema';
import { LogicInfoModel } from '@models/logicInfo/logicInfo.model';
import { LogicInfoController } from '@controllers/logic-info/logic-info.controller';
import { LogicInfoService } from '@use-cases/logic-info/logic-info.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LogicInfo.name, schema: LogicInfoSchema },
    ]),
  ],
  controllers: [LogicInfoController],
  providers: [LogicInfoService, LogicInfoModel],
})
export class LogicInfoModule {}
