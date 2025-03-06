import { Injectable } from '@nestjs/common';
import { CreateVocationalCategoryDto } from './dto/create-vocational-category.dto';
import { UpdateVocationalCategoryDto } from './dto/update-vocational-category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VocationalCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createVocationalCategoryDto: CreateVocationalCategoryDto) {
    return 'This action adds a new vocationalCategory';
  }

  findAll() {
    return this.prisma.vocationalCategories.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} vocationalCategory`;
  }

  update(id: number, updateVocationalCategoryDto: UpdateVocationalCategoryDto) {
    return `This action updates a #${id} vocationalCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} vocationalCategory`;
  }
}
