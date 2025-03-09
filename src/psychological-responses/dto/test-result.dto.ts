import { ApiProperty } from '@nestjs/swagger';
import { DimensionScoreDto } from './dimension-score.dto';

export class TestResultDto {
  @ApiProperty({
    description: 'Test result ID',
    example: 1,
  })
  testId: number;

  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'Test name',
    example: 'Emotional Intelligence Test',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Array of dimension scores',
    type: DimensionScoreDto,
    isArray: true,
  })
  dimensionScores: DimensionScoreDto[];

  @ApiProperty({
    description: 'Total score',
    example: 15,
  })
  totalScore: number;

  @ApiProperty({
    description: 'Maximum possible total score',
    example: 20,
  })
  maxTotalScore: number;

  @ApiProperty({
    description: 'Total score as a percentage',
    example: 75,
  })
  totalPercentage: number;

  @ApiProperty({
    description: 'Overall interpretation of the test result',
    example: 'You are doing well in this area',
  })
  overallInterpretation: string;
}
