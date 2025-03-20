import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ResEventDto } from './dto/res-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ResEventDto,
  })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all events' })
  @ApiCreatedResponse({
    description: 'List of all events',
    type: ResEventDto,
    isArray: true,
  })
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get an event by id' })
  @ApiCreatedResponse({
    description: 'Event found',
    type: ResEventDto,
  })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Get('type/:type')
  @Public()
  @ApiOperation({ summary: 'Get an event by type' })
  @ApiCreatedResponse({
    description: 'Events found',
    type: ResEventDto,
    isArray: true,
  })
  findByType(@Param('type') type: string) {
    return this.eventsService.findByType(type);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an event by id' })
  @ApiOkResponse({
    description: 'Event updated',
    type: ResEventDto,
  })
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an event by id' })
  @ApiOkResponse({
    description: 'Event deleted',
    type: ResEventDto,
  })
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
