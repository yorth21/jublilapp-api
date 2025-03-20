import { ApiProperty } from '@nestjs/swagger';

export class ResEventDto {
  @ApiProperty({
    description: 'Event ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Event type',
    example: 'concert',
  })
  type: string;

  @ApiProperty({
    description: 'Event title',
    example: 'Concert in the park',
  })
  title: string;

  @ApiProperty({
    description: 'Event description',
    example: 'A concert in the park',
  })
  description: string;

  @ApiProperty({
    description: 'Event link',
    example: 'https://www.eventbrite.com',
  })
  link: string;

  @ApiProperty({
    description: 'Event start date',
    example: '2021-10-01T10:00:00.000Z',
  })
  startDate: Date;

  @ApiProperty({
    description: 'Image URL',
    example: 'https://www.example.com/image.jpg',
  })
  image: string;

  @ApiProperty({
    description: 'Event location',
    example: 'Central Park, New York, NY',
  })
  location: string;
}
