import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsInt()
  postId: number;

  @ApiProperty()
  @IsString()
  content: string;
}
