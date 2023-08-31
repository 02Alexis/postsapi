import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostP } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDto } from './dto/create-comment.dto';

import { GetUser } from '../auth/get-user.decorator';
import { User } from 'src/auth/schemas/user.schema';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  //obtener todas las publicaciones
  @Get()
  async getAllPosts(): Promise<PostP[]> {
    return this.postService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard())
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<PostP> {
    const newPost = new PostP();
    newPost.title = createPostDto.title;
    newPost.description = createPostDto.description;
    newPost.image_url = createPostDto.image_url;

    return this.postService.create(newPost, user);
  }

  // enviar un comentario a una publicaión
  @Post(':postId/comment')
  @UseGuards(AuthGuard())
  createComment(
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() user: User,
  ) {
    return this.postService.createComment(postId, createCommentDto, user);
  }

  // Eliminar un comentario por el administrador
  @Delete(':postId/comments/:commentId')
  @UseGuards(AuthGuard(), AdminGuard)
  async deleteComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
  ): Promise<void> {
    await this.postService.deleteComment(postId, commentId);
  }

  // obtner una publicación mediante id
  @Get(':id')
  async getPost(
    @Param('id')
    id: string,
  ): Promise<PostP> {
    return this.postService.findById(id);
  }

  // Eliminar un post por el administrador
  @Delete(':postId')
  @UseGuards(AuthGuard(), AdminGuard)
  async deletePost(@Param('postId') postId: string): Promise<void> {
    await this.postService.deletePost(postId);
  }

  @Post(':postId/like')
  @UseGuards(AuthGuard())
  async likePost(@Param('postId') postId: string, @GetUser() user: User) {
    await this.postService.likePost(postId, user);
  }

  @Post(':postId/unlike')
  @UseGuards(AuthGuard())
  async unlikePost(@Param('postId') postId: string, @GetUser() user: User) {
    await this.postService.unlikePost(postId, user);
  }
}
