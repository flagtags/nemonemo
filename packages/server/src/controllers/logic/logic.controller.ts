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
} from '@nestjs/common';
import { LogicService } from '@use-cases/logic/logic.service';
import { UpdateLogicDto } from '@dto/logic/update-logic.dto';

@Controller('logic')
export class LogicController {
  constructor(private readonly logicService: LogicService) {}

  @Post()
  async createLogic(@Body() logicDTO: CreateLogicServiceDto) {
    try {
      return await this.logicService.createLogic(logicDTO);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  async findOneLogic(@Param('id') id: string) {
    try {
      return await this.logicService.findOneLogic({ _id: id });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id')
  async deleteLogic(@Param('id') id: string) {
    try {
      return await this.logicService.deleteLogic({ _id: id });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  async findLogics(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
  ) {
    try {
      return await this.logicService.findLogics({
        pageIndex,
        pageSize,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch(':id')
  async updateLogic(
    @Param('id') id: string,
    @Body() updateLogicDto: UpdateLogicDto,
  ) {
    try {
      return await this.logicService.updateLogic({
        _id: id,
        ...updateLogicDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}