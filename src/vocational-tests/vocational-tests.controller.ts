import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VocationalTestsService } from './vocational-tests.service';
import { CreateVocationalTestDto } from './dto/create-vocational-test.dto';
import { UpdateVocationalTestDto } from './dto/update-vocational-test.dto';

@Controller('vocational-tests')
export class VocationalTestsController {
  constructor(
    private readonly vocationalTestsService: VocationalTestsService,
  ) {}

  @Post()
  create(@Body() createVocationalTestDto: CreateVocationalTestDto) {
    return this.vocationalTestsService.create(createVocationalTestDto);
  }

  @Get()
  findAll() {
    return this.vocationalTestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vocationalTestsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVocationalTestDto: UpdateVocationalTestDto,
  ) {
    return this.vocationalTestsService.update(+id, updateVocationalTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vocationalTestsService.remove(+id);
  }
}
