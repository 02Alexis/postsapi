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

  async deleteComment(postId: string, commentId: string): Promise<void> {
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    const commentIndex = post.comments.findIndex(
      (c) => c._id.toString() === commentId,
    );

    if (commentIndex === -1) {
      throw new NotFoundException('Comment not found.');
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

  async create(post: PostP, user: User): Promise<PostP> {
    post.user = user; // Asignamos el objeto completo del usuario al post
    post.userName = user.name;
    post.userImage = user.image_url;
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

  async deletePost(postId: string): Promise<void> {
    const deletedPost = await this.postModel.findByIdAndDelete(postId);

    if (!deletedPost) {
      throw new NotFoundException('Post not found.');
    }
  }

  // Cuando un Usuario da "Me gusta":
  async likePost(postId: string, user: User): Promise<void> {
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    if (
      !post.likes.some(
        (likedUser) => likedUser.toString() === user._id.toString(),
      )
    ) { // se agrega el ID del usuario al array likes y luego actualizarías el contador likeCount:)
      post.likes.push(user); // Agregar el ID del usuario al array
      post.likeCount++; 
      await post.save();
    }
  }

  // Cuando un Usuario quita su "Me gusta":( 
  async unlikePost(postId: string, user: User): Promise<void> {
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    if (
      post.likes.some(
        (likedUser) => likedUser.toString() === user._id.toString(),
      )
    ) { // se elmina el ID del usuario del array likes y actualizarías el contador likeCount:
      post.likes = post.likes.filter(
        (likedUser) => likedUser.toString() !== user._id.toString(),
      );
      post.likeCount--;
      await post.save();
    }
  }
}
