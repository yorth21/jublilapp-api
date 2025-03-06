import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VocationalAnswewrsService } from './vocational-answewrs.service';
import { CreateVocationalAnswewrDto } from './dto/create-vocational-answewr.dto';
import { UpdateVocationalAnswewrDto } from './dto/update-vocational-answewr.dto';

@Controller('vocational-answewrs')
export class VocationalAnswewrsController {
  constructor(private readonly vocationalAnswewrsService: VocationalAnswewrsService) {}

  @Post()
  create(@Body() createVocationalAnswewrDto: CreateVocationalAnswewrDto) {
    return this.vocationalAnswewrsService.create(createVocationalAnswewrDto);
  }

  @Get()
  findAll() {
    return this.vocationalAnswewrsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vocationalAnswewrsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVocationalAnswewrDto: UpdateVocationalAnswewrDto) {
    return this.vocationalAnswewrsService.update(+id, updateVocationalAnswewrDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vocationalAnswewrsService.remove(+id);
  }
}
