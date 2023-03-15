import { Controller, Param, Post } from '@nestjs/common';
import { UpdateLogicInfoDto } from '@dto/logicInfo/update-logic-info.dto';
import { LogicInfoService } from '@use-cases/logic-info/logic-info.service';

@Controller('logicInfo')
export class LogicInfoController {
  constructor(private readonly logicInfoService: LogicInfoService) {}

  @Post(':logicId/likes')
  async increaseLikes(
    @Param('logicId') logicId: UpdateLogicInfoDto['logicId'],
  ) {
    return await this.logicInfoService.increaseLikes(logicId);
  }
}
