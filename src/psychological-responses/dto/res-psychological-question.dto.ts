import { ApiProperty } from '@nestjs/swagger';

export class ResPsychologicalQuestionDto {
  @ApiProperty({
    description: 'ID of the question',
    example: 1,
  })
  questionId: number;

  @ApiProperty({
    description: 'Question text',
    example: 'Me siento capaz de tomar decisiones importantes en mi vida.',
  })
  question: string;

  @ApiProperty({
    description: 'ID of the dimension',
    example: 1,
  })
  dimensionId: number;

  @ApiProperty({
    description: 'Title of the dimension',
    example: 'Control Personal',
  })
  dimensionTitle: string;

  @ApiProperty({
    description: 'Description of the dimension',
    example:
      'Evaluación de la percepción sobre la influencia en la vida y entorno.',
  })
  dimensionDescription: string;

  @ApiProperty({
    description: 'Position of the question in the test',
    example: 1,
  })
  position: number;
}
