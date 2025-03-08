import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ResponseVocationalTestDto {
  @ApiProperty({
    description: 'Question ID',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @ApiProperty({
    description: 'Answer ID',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  answerId: number;
}
