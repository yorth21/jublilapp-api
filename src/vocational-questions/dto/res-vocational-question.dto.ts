import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ResVocationalAnswerDto } from 'src/vocational-answers/dto/res-vocational-answer.dto';

export class ResVocationalQuestionDto {
  @ApiProperty({
    description: 'Question ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Question',
    example: '¿Qué tipo de actividades disfrutas más?',
  })
  @IsString()
  question: string;

  @ApiProperty({
    description: 'Position of the question',
    example: 1,
  })
  position: number;

  @ApiProperty({
    description: 'List of answers for the question',
    type: ResVocationalAnswerDto,
    isArray: true,
  })
  answers?: ResVocationalAnswerDto[];
}
