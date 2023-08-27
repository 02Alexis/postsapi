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
      user: user._id,
      text: createCommentDto.text,
    });

    post.comments.push(newComment);
    await post.save();

    return newComment;
  }

  // async findAll(): Promise<PostP[]> {
  //   const posts = await this.postModel.find();

  //   // Realizar transformación de los datos para incluir detalles de los comentarios
  //   const postsWithComments = await Promise.all(
  //     posts.map(async (post) => {
  //       const commentIds = post.comments.map((comment) => comment._id); // Extraemos los IDs de los comentarios
  //       const populatedComments = await this.populateComments(commentIds);
  //       return { ...post.toObject(), comments: populatedComments };
  //     }),
  //   );

  //   return postsWithComments;
  // }
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


  // async create(postp: PostP, user: User): Promise<PostP> {
  //   const data = Object.assign(postp, { user: user._id });

  //   const res = await this.postModel.create(data);
  //   return res;
  // }
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
