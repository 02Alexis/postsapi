import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/post.schema';
import { AuthModule } from '../auth/auth.module';
import { CommentSchema } from './schemas/comment.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'PostP', schema: PostSchema },
      { name: 'Comment', schema: CommentSchema },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
