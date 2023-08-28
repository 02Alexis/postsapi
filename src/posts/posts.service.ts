import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostP } from './schemas/post.schema';
import * as mongoose from 'mongoose';
import { User } from '../auth/schemas/user.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './schemas/comment.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostP.name)
    private readonly postModel: mongoose.Model<PostP>,
    @InjectModel(Comment.name) private commentModel: mongoose.Model<Comment>,
  ) {}

  async createComment(
    postId: string,
    createCommentDto: CreateCommentDto,
    user: User,
  ) {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    const newComment = new this.commentModel({
      userId: user._id,
      text: createCommentDto.text,
      userName: user.name,
      userImage: user.image_url,
    });

    post.comments.push(newComment);
    await post.save();

    return newComment;
  }

  async deleteComment(
    postId: string,
    commentId: string,
    user: User,
  ): Promise<void> {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    const commentIndex = post.comments.findIndex(
      (c) =>
        c._id.toString() === commentId &&
        c.userId.toString() === user._id.toString(),
    );

    if (commentIndex === -1) {
      throw new NotFoundException(
        'Comment not found or you are not the author.',
      );
    }

    post.comments.splice(commentIndex, 1);

    await post.save();
  }

  async findAll(): Promise<PostP[]> {
    const posts = await this.postModel.find().populate('comments'); //nos traemos la cadena de datos
    return posts;
  }

  async populateComments(
    commentIds: mongoose.Types.ObjectId[],
  ): Promise<Comment[]> {
    const populatedComments = await this.commentModel.find({
      _id: { $in: commentIds },
    });
    return populatedComments;
  }

  async create(post: PostP): Promise<PostP> {
    const res = await this.postModel.create(post);
    return res;
  }

  async findById(id: string): Promise<PostP> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const post = await this.postModel.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found.');
    }
    return post;
  }

  async updateById(id: string, postp: PostP): Promise<PostP> {
    return await this.postModel.findByIdAndUpdate(id, postp, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<void> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const deletedPost = await this.postModel.findByIdAndDelete(id);

    if (!deletedPost) {
      throw new NotFoundException('Post not found.');
    }
  }
}
