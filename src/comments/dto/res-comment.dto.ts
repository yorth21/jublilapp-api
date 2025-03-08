import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResCommentDto {
  @ApiProperty({
    description: 'Comment ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'User names',
    example: 'John Doe',
  })
  userNames?: string;

  @ApiProperty({
    description: 'Post ID',
    example: 1,
  })
  postId: number;

  @ApiProperty({
    description: 'Comment content',
    example: 'This is a comment',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Comment creation date',
    example: '2021-08-19T00:00:00.000',
  })
  createdAt: Date;
}
