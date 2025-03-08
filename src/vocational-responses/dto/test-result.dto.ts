import { ApiProperty } from '@nestjs/swagger';
import { CategoryScoreDto } from './category-score.dto';
import { DomaninCategoryScoreDto } from './domain-category-score.dto';

export class TestResultDto {
  @ApiProperty({
    description: 'Test ID',
    example: 1,
  })
  testId: number;

  @ApiProperty({
    description: 'Scores',
    type: CategoryScoreDto,
    isArray: true,
  })
  scores: CategoryScoreDto[];

  @ApiProperty({
    description: 'Dominant category',
    type: DomaninCategoryScoreDto,
  })
  dominantCategory: DomaninCategoryScoreDto;
}
