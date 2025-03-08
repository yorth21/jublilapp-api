import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';
import { ResPostDto } from './dto/res-post.dto';
import { PostMapper } from './mappers/post.mapper';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createPostDto: CreatePostDto,
    userId: number,
  ): Promise<ResPostDto> {
    const post = await this.prisma.posts.create({
      data: {
        userId,
        title: createPostDto.title,
        content: createPostDto.content,
      },
      include: { user: true },
    });

    const postMapper = PostMapper.toResPostDto(post);
    postMapper.userNames = post.user.names;

    return postMapper;
  }

  async findAll(): Promise<ResPostDto[]> {
    const posts = await this.prisma.posts.findMany({
      where: { isActive: true },
      include: { user: true },
    });

    return posts.map((post) => {
      const postMapper = PostMapper.toResPostDto(post);
      postMapper.userNames = post.user.names;

      return postMapper;
    });
  }

  async findOne(id: number): Promise<ResPostDto> {
    const post = await this.prisma.posts.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    const postMapper = PostMapper.toResPostDto(post);
    postMapper.userNames = post.user.names;

    return postMapper;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<ResPostDto> {
    const post = await this.prisma.posts.update({
      where: { id },
      data: updatePostDto,
      include: { user: true },
    });

    const postMapper = PostMapper.toResPostDto(post);
    postMapper.userNames = post.user.names;

    return postMapper;
  }

  async remove(id: number): Promise<ResPostDto> {
    const post = await this.prisma.posts.update({
      where: { id },
      data: { isActive: false },
      include: { user: true },
    });

    const postMapper = PostMapper.toResPostDto(post);
    postMapper.userNames = post.user.names;

    return postMapper;
  }
}
