import { ApiProperty } from '@nestjs/swagger';

export class ResMeetDto {
  @ApiProperty({
    description: 'Id of the meet',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Id of the user',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  userNames?: string;

  @ApiProperty({
    description: 'Date of the meet',
    example: '2021-09-23T00:00:00.000Z',
  })
  date: Date;

  @ApiProperty({
    description: 'Name of the doctor',
    example: 'Dr. John Doe',
  })
  doctorName: string;

  @ApiProperty({
    description: 'Description of the meet',
    example: 'Meet for a checkup',
  })
  description: string;

  @ApiProperty({
    description: 'Date of creation',
    example: '2021-09-23T00:00:00.000Z',
  })
  createdAt: Date;
}
