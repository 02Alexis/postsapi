import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../auth/schemas/user.schema';

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop()
  text: string;

  @Prop()
  userName: string; 

  @Prop()
  userImage: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);