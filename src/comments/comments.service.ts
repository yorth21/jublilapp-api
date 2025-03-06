import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCommentDto: CreateCommentDto, userId: number) {
    return this.prisma.comments.create({
      data: {
        userId,
        postId: createCommentDto.postId,
        content: createCommentDto.content,
      },
    });
  }

  findAll() {
    return this.prisma.comments.findMany({
      where: { isActive: true },
    });
  }

  findOne(id: number) {
    return this.prisma.comments.findUnique({
      where: { id },
    });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
