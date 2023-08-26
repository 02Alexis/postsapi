import { Controller, Get, Post, Put, Body, Param, UseGuards, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostP } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) {}

    @Get()
    async getAllPosts(): Promise<PostP[]> {
        return this.postService.findAll()
    }

    @Post()
    @UseGuards(AuthGuard())
    async createPost(
        @Body()
        post: CreatePostDto,
        @Req() req,
    ): Promise<PostP> {
        return this.postService.create(post, req.user)
    }

    @Get(':id')
    async getPost(
        @Param('id')
        id: string
    ): Promise<PostP> {
        return this.postService.findById(id)
    }

    @Put(':id')
    async UpdatePost(
        @Param('id')
        id: string,
        @Body()
        post: UpdatePostDto
    ): Promise<PostP> {
        return this.postService.updateById(id, post)
    }
}