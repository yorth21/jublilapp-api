import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResVocationalAnswerDto {
  @ApiProperty({
    description: 'Answer ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Question ID',
    example: 1,
  })
  questionId: number;

  @ApiProperty({
    description: 'Category ID',
    example: 1,
  })
  categoryId: number;

  @ApiProperty({
    description: 'Answer',
    example: 'Dibujar, pintar o hacer manualidades.',
  })
  @IsString()
  answer: string;
}
