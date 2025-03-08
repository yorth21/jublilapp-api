import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthenticatedRequest } from 'src/interfaces/authenticated-user.interface';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ResPostDto } from './dto/res-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ResPostDto,
  })
  create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.postsService.create(createPostDto, req.user.id);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiOkResponse({
    description: 'List of all posts',
    type: ResPostDto,
    isArray: true,
  })
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a post by id' })
  @ApiOkResponse({
    description: 'Post found',
    type: ResPostDto,
  })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a post by id' })
  @ApiOkResponse({
    description: 'Post updated',
    type: ResPostDto,
  })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a post by id' })
  @ApiOkResponse({
    description: 'Post deleted',
    type: ResPostDto,
  })
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
