import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { MeetsService } from './meets.service';
import { CreateMeetDto } from './dto/create-meet.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthenticatedRequest } from 'src/interfaces/authenticated-user.interface';
import { ResMeetDto } from './dto/res-meet.dto';

@Controller('meets')
@ApiBearerAuth()
export class MeetsController {
  constructor(private readonly meetsService: MeetsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new meet' })
  @ApiCreatedResponse({
    type: ResMeetDto,
    description: 'The record has been successfully created.',
  })
  create(
    @Body() createMeetDto: CreateMeetDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.meetsService.create(createMeetDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all meets' })
  @ApiOkResponse({
    type: ResMeetDto,
    isArray: true,
    description: 'List of all meets',
  })
  findAll() {
    return this.meetsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a meet by id' })
  @ApiOkResponse({
    type: ResMeetDto,
    description: 'Meet found',
  })
  findOne(@Param('id') id: string) {
    return this.meetsService.findOne(+id);
  }

  @Get('/user/:identification')
  @ApiOperation({ summary: 'Get a meet by user identification' })
  @ApiOkResponse({
    type: ResMeetDto,
    description: 'Meet found',
  })
  findByUserIdentification(@Param('identification') identification: string) {
    return this.meetsService.findByUserIdentification(identification);
  }
}
