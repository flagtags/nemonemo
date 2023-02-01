import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogicDocmuent = Logic & Document;

@Schema()
export class Logic {
  @Prop()
  id: string;

  @Prop()
  answer: boolean[][];

  @Prop()
  hintRow: number[][];

  @Prop()
  hintColumn: number[][];

  @Prop()
  timeLimit: number;

  @Prop()
  title: string;

  @Prop()
  authorId: string;

  @Prop()
  size: number;
}

export const logicSchema = SchemaFactory.createForClass(Logic);