import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogicInfoDocmuent = LogicInfo & Document;

@Schema()
export class LogicInfo {
  @Prop()
  logicId: string;

  @Prop({
    default: 0,
  })
  views: number;

  @Prop({
    default: 0,
  })
  solvedCount: number;

  @Prop({
    default: 0,
  })
  likes: number;

  @Prop()
  averageSolvedTimeMs: number;

  @Prop()
  bestSolvedTimeMs: number;
}

export const LogicInfoSchema = SchemaFactory.createForClass(LogicInfo);
