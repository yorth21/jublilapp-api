import { ApiProperty } from '@nestjs/swagger';
import { CategoryScoreDto } from './category-score.dto';

export class DomaninCategoryScoreDto extends CategoryScoreDto {
  @ApiProperty({
    description: 'Category percentage',
    example: 50,
  })
  percentage: number;
}
