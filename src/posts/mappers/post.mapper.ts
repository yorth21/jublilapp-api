import { Posts } from '@prisma/client';
import { ResPostDto } from '../dto/res-post.dto';

export class PostMapper {
  static toResPostDto(post: Posts): ResPostDto {
    return {
      id: post.id,
      userId: post.userId,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
    };
  }
}
