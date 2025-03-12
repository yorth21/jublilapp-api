import { ApiProperty } from '@nestjs/swagger';

export class CreateMeetDto {
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
}
