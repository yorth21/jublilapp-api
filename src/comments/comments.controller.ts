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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthenticatedRequest } from 'src/interfaces/authenticated-user.interface';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ResCommentDto } from './dto/res-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ResCommentDto,
  })
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.commentsService.create(createCommentDto, req.user.id);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all comments' })
  @ApiOkResponse({
    description: 'List of all comments',
    type: ResCommentDto,
    isArray: true,
  })
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a comment by id' })
  @ApiOkResponse({
    description: 'Comment found',
    type: ResCommentDto,
  })
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Get('post/:postId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get comments by post id' })
  @ApiOkResponse({
    description: 'List of comments for the post',
    type: ResCommentDto,
    isArray: true,
  })
  findByPostId(@Param('postId') postId: string) {
    return this.commentsService.findByPostId(+postId);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a comment by id' })
  @ApiOkResponse({
    description: 'Comment updated',
    type: ResCommentDto,
  })
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a comment by id' })
  @ApiOkResponse({
    description: 'Comment deleted',
    type: ResCommentDto,
  })
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
