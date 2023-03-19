import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LikesHistoryDocument = LikesHistory & Document;

@Schema()
export class LikesHistory {
  @Prop({ required: true })
  logicId: string;

  @Prop({ required: true })
  userId: string;
}

export const LikesHistorySchema = SchemaFactory.createForClass(LikesHistory);
