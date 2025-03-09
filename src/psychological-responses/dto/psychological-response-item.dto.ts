import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PsychologicalResponseItemDto {
  @ApiProperty({
    description: 'Question ID',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @ApiProperty({
    description: 'Likert Scale ID',
    example: 4,
  })
  @IsNumber()
  @IsNotEmpty()
  scaleId: number;
}
