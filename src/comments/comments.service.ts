import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma.service';
import { ResCommentDto } from './dto/res-comment.dto';
import { CommentMapper } from './mappers/comment.mapper';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createCommentDto: CreateCommentDto,
    userId: number,
  ): Promise<ResCommentDto> {
    const post = await this.prisma.posts.findUnique({
      where: { id: createCommentDto.postId },
    });

    if (!post) {
      throw new BadRequestException('Post not found');
    }

    const comment = await this.prisma.comments.create({
      data: {
        userId,
        postId: createCommentDto.postId,
        content: createCommentDto.content,
      },
      include: { user: true },
    });

    const commentMapper = CommentMapper.toResCommentDto(comment);
    commentMapper.userNames = comment.user.names;

    return commentMapper;
  }

  async findAll(): Promise<ResCommentDto[]> {
    const comments = await this.prisma.comments.findMany({
      where: { isActive: true },
      include: { user: true },
    });

    return comments.map((comment) => {
      const commentMapper = CommentMapper.toResCommentDto(comment);
      commentMapper.userNames = comment.user.names;

      return commentMapper;
    });
  }

  async findOne(id: number): Promise<ResCommentDto> {
    const comment = await this.prisma.comments.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    const commentMapper = CommentMapper.toResCommentDto(comment);
    commentMapper.userNames = comment.user.names;

    return commentMapper;
  }

  async findByPostId(postId: number): Promise<ResCommentDto[]> {
    const comments = await this.prisma.comments.findMany({
      where: { postId },
      include: { user: true },
    });

    return comments.map((comment) => {
      const commentMapper = CommentMapper.toResCommentDto(comment);
      commentMapper.userNames = comment.user.names;

      return commentMapper;
    });
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<ResCommentDto> {
    const comment = await this.prisma.comments.update({
      where: { id },
      data: updateCommentDto,
      include: { user: true },
    });

    const commentMapper = CommentMapper.toResCommentDto(comment);
    commentMapper.userNames = comment.user.names;

    return commentMapper;
  }

  async remove(id: number): Promise<ResCommentDto> {
    const comment = await this.prisma.comments.update({
      where: { id },
      data: { isActive: false },
      include: { user: true },
    });

    const commentMapper = CommentMapper.toResCommentDto(comment);
    commentMapper.userNames = comment.user.names;

    return commentMapper;
  }
}
