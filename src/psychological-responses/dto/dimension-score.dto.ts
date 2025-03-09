import { ApiProperty } from '@nestjs/swagger';

export class DimensionScoreDto {
  @ApiProperty({
    description: 'Dimension ID',
    example: 1,
  })
  dimensionId: number;

  @ApiProperty({
    description: 'Dimension name',
    example: 'Emotional Stability',
  })
  name: string;

  @ApiProperty({
    description: 'Dimension description',
    example: 'The ability to remain calm and composed in stressful situations',
  })
  description: string;

  @ApiProperty({
    description: 'Dimension score',
    example: 3,
  })
  score: number;

  @ApiProperty({
    description: 'Maximum possible score for the dimension',
    example: 5,
  })
  maxScore: number;

  @ApiProperty({
    description: 'Dimension score as a percentage',
    example: 60,
  })
  percentage: number;

  @ApiProperty({
    description: 'Interpretation of the dimension score',
    example: 'You are doing well in this area',
  })
  interpretation: string;
}
