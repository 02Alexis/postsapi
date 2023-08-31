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

  @Prop()
  userName: string;

  @Prop()
  userImage: string;

  @Prop([CommentSchema])
  comments: Comment[];

  // agrego un campo de array para almacenar los IDs de los usuarios que han dado "Me gusta":
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  likes: User[];

  @Prop({ default: 0 })
  likeCount: number;
}

export type PostDocument = PostP & mongoose.Document;

export const PostSchema = SchemaFactory.createForClass(PostP);
