import { LikeDto } from '@dto/logicInfo/like-dto';
import { UpdateLogicInfoDto } from '@dto/logicInfo/update-logic-info.dto';
import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { LogicInfoService } from '@use-cases/logic-info/logic-info.service';
import { AuthGuard } from 'src/guards/authGuard';

@Controller('logicInfo')
@UseGuards(AuthGuard)
export class LogicInfoController {
  constructor(private readonly logicInfoService: LogicInfoService) {}

  @Post(':logicId/likes')
  async toggleLikes(@Param() likeDto: LikeDto) {
    return await this.logicInfoService.toggleLikes(likeDto);
  }

  @Post(':logicId/views')
  async increaseViews(
    @Param('logicId') logicId: UpdateLogicInfoDto['logicId'],
  ) {
    return await this.logicInfoService.increaseViews(logicId);
  }
}
