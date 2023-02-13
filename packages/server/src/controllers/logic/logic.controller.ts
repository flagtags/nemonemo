import { CreateLogicServiceDto } from '@dto/logic/create-logic-service.dto';
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Param,
  Delete,
  Query,
  Patch,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { OmitType } from '@nestjs/mapped-types';
import { LogicService } from '@use-cases/logic/logic.service';
import { UpdateLogicDto } from '@dto/logic/update-logic.dto';
import { FindLogicsDto } from '@dto/logic/find-logics.dto';
import { DeleteLogicDto } from '@dto/logic/delete-logic.dto';
import { FindOneLogicDto } from '@dto/logic/find-one-logic.dto';

class AA extends OmitType(UpdateLogicDto, ['_id'] as const) {}

@Controller('logic')
export class LogicController {
  constructor(private readonly logicService: LogicService) {}

  @Post()
  async createLogic(@Body() logicDTO: CreateLogicServiceDto) {
    try {
      return await this.logicService.createLogic(logicDTO);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':_id')
  async findOneLogic(
    @Param('_id', new ParseIntPipe()) _id: FindOneLogicDto['_id'],
  ) {
    try {
      console.log(typeof _id);
      return await this.logicService.findOneLogic({ _id });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':_id')
  async deleteLogic(@Param('_id') _id: DeleteLogicDto['_id']) {
    try {
      return await this.logicService.deleteLogic({ _id });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  async findLogics(@Query() query: FindLogicsDto) {
    try {
      return await this.logicService.findLogics(query);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch(':_id')
  async updateLogic(
    @Param('_id') _id: UpdateLogicDto['_id'],
    @Body() updateLogicDto: AA,
  ) {
    try {
      return await this.logicService.updateLogic({
        _id,
        ...updateLogicDto,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
