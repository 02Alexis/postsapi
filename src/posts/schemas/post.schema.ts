import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../auth/schemas/user.schema';
import mongoose from 'mongoose';
import { Comment, CommentSchema } from './comment.schema';

@Schema({
  timestamps: true,
})
export class PostP {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  image_url: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop([CommentSchema])
  comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(PostP);
