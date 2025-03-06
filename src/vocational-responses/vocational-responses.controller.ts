import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VocationalResponsesService } from './vocational-responses.service';
import { CreateVocationalResponseDto } from './dto/create-vocational-response.dto';
import { UpdateVocationalResponseDto } from './dto/update-vocational-response.dto';

@Controller('vocational-responses')
export class VocationalResponsesController {
  constructor(private readonly vocationalResponsesService: VocationalResponsesService) {}

  @Post()
  create(@Body() createVocationalResponseDto: CreateVocationalResponseDto) {
    return this.vocationalResponsesService.create(createVocationalResponseDto);
  }

  @Get()
  findAll() {
    return this.vocationalResponsesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vocationalResponsesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVocationalResponseDto: UpdateVocationalResponseDto) {
    return this.vocationalResponsesService.update(+id, updateVocationalResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vocationalResponsesService.remove(+id);
  }
}
