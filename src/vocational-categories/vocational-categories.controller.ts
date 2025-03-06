import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VocationalCategoriesService } from './vocational-categories.service';
import { CreateVocationalCategoryDto } from './dto/create-vocational-category.dto';
import { UpdateVocationalCategoryDto } from './dto/update-vocational-category.dto';

@Controller('vocational-categories')
export class VocationalCategoriesController {
  constructor(private readonly vocationalCategoriesService: VocationalCategoriesService) {}

  @Post()
  create(@Body() createVocationalCategoryDto: CreateVocationalCategoryDto) {
    return this.vocationalCategoriesService.create(createVocationalCategoryDto);
  }

  @Get()
  findAll() {
    return this.vocationalCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vocationalCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVocationalCategoryDto: UpdateVocationalCategoryDto) {
    return this.vocationalCategoriesService.update(+id, updateVocationalCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vocationalCategoriesService.remove(+id);
  }
}
