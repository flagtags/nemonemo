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
  averageSolveTimeMs: number;

  @Prop()
  bestSolveTimeMs: number;
}

export const LogicSchema = SchemaFactory.createForClass(LogicInfo);
