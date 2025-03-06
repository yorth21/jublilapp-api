import { IsInt, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsInt()
  postId: number;

  @IsString()
  content: string;
}
