import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  userName: string;

  @Prop()
  password: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  isBanned: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
