import { Comments } from '@prisma/client';
import { ResCommentDto } from '../dto/res-comment.dto';

export class CommentMapper {
  static toResCommentDto(comment: Comments): ResCommentDto {
    return {
      id: comment.id,
      userId: comment.userId,
      postId: comment.postId,
      content: comment.content,
      createdAt: comment.createdAt,
    };
  }
}
