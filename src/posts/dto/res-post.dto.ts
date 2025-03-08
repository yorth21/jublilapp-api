import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResPostDto {
  @ApiProperty({
    description: 'Post ID',
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
    example: 'John',
  })
  userNames?: string;

  @ApiProperty({
    description: 'Post title',
    example: 'Hello, world!',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Post content',
    example: 'This is a post content.',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Post creation date',
    example: '2021-01-01T00:00:00.000Z',
  })
  createdAt: Date;
}
