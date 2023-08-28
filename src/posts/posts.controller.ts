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

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  //obtener todas las publicaciones
  @Get()
  async getAllPosts(): Promise<PostP[]> {
    return this.postService.findAll();
  }

  // // enviar una publicación
  // @Post()
  // @UseGuards(AuthGuard())
  // async createPost(
  //     @Body()
  //     post: CreatePostDto,
  //     @Req() req,
  // ): Promise<PostP> {
  //     return this.postService.create(post, req.user)
  // }
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
    newPost.user = user;

    return this.postService.create(newPost);
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

  @Delete(':postId/comment/:commentId')
  @UseGuards(AuthGuard())
  async deleteComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @GetUser() user: User,
  ): Promise<void> {
    await this.postService.deleteComment(postId, commentId, user);
  }

  // obtner una publicación mediante id
  @Get(':id')
  async getPost(
    @Param('id')
    id: string,
  ): Promise<PostP> {
    return this.postService.findById(id);
  }

  // Actualizar una publicación mediante id
  //   @Put(':id')
  //   async UpdatePost(
  //     @Param('id')
  //     id: string,
  //     @Body()
  //     post: UpdatePostDto,
  //   ): Promise<PostP> {
  //     return this.postService.updateById(id, post);
  //   }

  // Eliminar una publicación mediante id
  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<void> {
    await this.postService.deleteById(id);
  }
}
