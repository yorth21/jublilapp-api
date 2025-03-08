import { ApiProperty } from '@nestjs/swagger';

export class CategoryScoreDto {
  @ApiProperty({
    description: 'Category ID',
    example: 1,
  })
  categoryId: number;

  @ApiProperty({
    description: 'Category code',
    example: 'I',
  })
  code: string;

  @ApiProperty({
    description: 'Category name',
    example: 'Investigative',
  })
  name: string;

  @ApiProperty({
    description: 'Category description',
    example: 'Prefiere trabajos manuales y técnicos.',
  })
  description: string;

  @ApiProperty({
    description: 'Category score',
    example: 5,
  })
  score: number;
}
