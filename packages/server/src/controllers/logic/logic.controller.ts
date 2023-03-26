import { CreateLogicServiceDto } from '@dto/logic/create-logic-service.dto';
import { DeleteLogicDto } from '@dto/logic/delete-logic.dto';
import { FindLogicsDto } from '@dto/logic/find-logics.dto';
import { FindOneLogicDto } from '@dto/logic/find-one-logic.dto';
import { UpdateLogicDto } from '@dto/logic/update-logic.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OmitType } from '@nestjs/mapped-types';
import { AtLeastOnePropertyValidationPipe } from '@pipe/atLeastOnePropertyValidationPipe';
import { LogicService } from '@use-cases/logic/logic.service';
import { AuthGuard } from 'src/guards/authGuard';

class IdOmitedUpdatedLogicDto extends OmitType(UpdateLogicDto, [
  '_id',
] as const) {}

@Controller('logic')
@UseGuards(AuthGuard)
export class LogicController {
  constructor(private readonly logicService: LogicService) {}

  @Post()
  async createLogic(@Body() logicDTO: CreateLogicServiceDto) {
    return await this.logicService.createLogic(logicDTO);
  }

  @Get(':_id')
  async findOneLogic(@Param('_id') _id: FindOneLogicDto['_id']) {
    return await this.logicService.findOneLogic({ _id });
  }

  @Delete(':_id')
  async deleteLogic(@Param('_id') _id: DeleteLogicDto['_id']) {
    return await this.logicService.deleteLogic({ _id });
  }

  @Get()
  async findLogics(@Query() query: FindLogicsDto) {
    return await this.logicService.findLogics(query);
  }

  @Patch(':_id')
  async updateLogic(
    @Param('_id') _id: UpdateLogicDto['_id'],
    @Body(new AtLeastOnePropertyValidationPipe())
    updateLogicDto: IdOmitedUpdatedLogicDto,
  ) {
    try {
      return await this.logicService.updateLogic({
        _id,
        ...updateLogicDto,
      });
    } catch (error) {
      console.error('in try catch');
    }
  }
}
