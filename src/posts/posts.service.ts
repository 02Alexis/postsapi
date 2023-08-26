import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostP } from './schemas/post.schema';
import * as mongoose from 'mongoose';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostP.name)
    private postModel: mongoose.Model<PostP>,
  ) {}

  async findAll(): Promise<PostP[]> {
    const posts = await this.postModel.find();
    return posts;
  }

  async create(postp: PostP, user: User): Promise<PostP> {
    const data = Object.assign(postp, { user: user._id });

    const res = await this.postModel.create(data);
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
}
