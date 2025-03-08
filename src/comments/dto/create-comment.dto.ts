import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Post ID',
    example: 1,
  })
  @IsInt()
  postId: number;

  @ApiProperty({
    description: 'Comment content',
    example: 'This is my first comment',
  })
  @IsString()
  content: string;
}
