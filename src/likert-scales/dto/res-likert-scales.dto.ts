import { ApiProperty } from '@nestjs/swagger';

export class ResLikertScaleDto {
  @ApiProperty({
    description: 'ID likert scale',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Name of likert scale',
    example: 'Totalmente en desacuerdo',
  })
  name: string;
}
