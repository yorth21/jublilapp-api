import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPostDto: CreatePostDto, userId: number) {
    return this.prisma.posts.create({
      data: {
        userId,
        title: createPostDto.title,
        content: createPostDto.content,
      },
    });
  }

  findAll() {
    return this.prisma.posts.findMany({
      where: { isActive: true },
    });
  }

  findOne(id: number) {
    return this.prisma.posts.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
