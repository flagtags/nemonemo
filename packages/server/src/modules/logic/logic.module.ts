import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogicEntity } from '@entities/logic-entity/logic-entity.service';
import { LogicController } from '@controllers/logic/logic.controller';
import { LogicService } from '@use-cases/logic/logic.service';
import { Logic, LogicSchema } from '@models/logic/logic.schema';
import { LogicInfo, LogicInfoSchema } from '@models/logicInfo/logicInfo.schema';
import { LogicModel } from '@models/logic/logic.model';
import { LogicInfoModel } from '@models/logicInfo/logicInfo.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Logic.name, schema: LogicSchema },
      { name: LogicInfo.name, schema: LogicInfoSchema },
    ]),
  ],
  controllers: [LogicController],
  providers: [LogicService, LogicModel, LogicInfoModel],
})
export class LogicModule {}
