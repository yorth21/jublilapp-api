import { Events } from '@prisma/client';
import { ResEventDto } from '../dto/res-event.dto';

export class EventMapper {
  static toResEventDto(event: Events): ResEventDto {
    return {
      id: event.id,
      type: event.type,
      title: event.title,
      description: event.description,
      link: event.link,
      startDate: event.startDate,
      image: event.image,
      location: event.location,
    };
  }
}
