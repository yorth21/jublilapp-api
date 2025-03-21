import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma.service';
import { ResEventDto } from './dto/res-event.dto';
import { EventMapper } from './mappers/event.mapper';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto): Promise<ResEventDto> {
    const eventDate = new Date(createEventDto.startDate);
    const currentDate = new Date();

    if (eventDate < currentDate) {
      throw new BadRequestException(
        'The event date must be greater than the current date',
      );
    }

    const event = await this.prisma.events.create({
      data: {
        type: createEventDto.type,
        title: createEventDto.title,
        description: createEventDto.description,
        link: createEventDto.link,
        startDate: new Date(createEventDto.startDate),
        image: createEventDto.image,
        location: createEventDto.location,
      },
    });

    return EventMapper.toResEventDto(event);
  }

  async findAll(): Promise<ResEventDto[]> {
    const events = await this.prisma.events.findMany({
      where: { isActive: true },
    });

    return events.map((event) => EventMapper.toResEventDto(event));
  }

  async findOne(id: number): Promise<ResEventDto> {
    const event = await this.prisma.events.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return EventMapper.toResEventDto(event);
  }

  async findByType(type: string): Promise<ResEventDto[]> {
    const events = await this.prisma.events.findMany({
      where: { type, isActive: true },
    });

    return events.map((event) => EventMapper.toResEventDto(event));
  }

  async update(
    id: number,
    updateEventDto: UpdateEventDto,
  ): Promise<ResEventDto> {
    const event = await this.prisma.events.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const updatedEvent = await this.prisma.events.update({
      where: { id },
      data: {
        type: updateEventDto.type,
        title: updateEventDto.title,
        description: updateEventDto.description,
        link: updateEventDto.link,
        startDate: updateEventDto.startDate,
        image: updateEventDto.image,
        location: updateEventDto.location,
      },
    });

    return EventMapper.toResEventDto(updatedEvent);
  }

  async remove(id: number): Promise<ResEventDto> {
    const event = await this.prisma.events.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    await this.prisma.events.update({
      where: { id },
      data: { isActive: false },
    });

    return EventMapper.toResEventDto(event);
  }
}
