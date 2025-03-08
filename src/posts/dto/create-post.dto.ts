import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'My first post',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Post content',
    example: 'This is my first post',
  })
  @IsString()
  content: string;
}
