import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Profile } from './profile.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, unique: true })
  name: string;

  @Prop(Number)
  age: number;

  @Prop({ type: Types.ObjectId, ref: Profile.name, required: true })
  // If we assign  new Types.ObjectId(rId) it will give error if we don't accept Types.ObjectId
  profile: Profile | Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
