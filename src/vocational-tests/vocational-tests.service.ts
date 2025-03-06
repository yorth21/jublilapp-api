import { Injectable } from '@nestjs/common';
import { CreateVocationalTestDto } from './dto/create-vocational-test.dto';
import { UpdateVocationalTestDto } from './dto/update-vocational-test.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VocationalTestsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createVocationalTestDto: CreateVocationalTestDto) {
    return 'This action adds a new vocationalTest';
  }

  findAll() {
    return this.prisma.vocationalTests.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} vocationalTest`;
  }

  update(id: number, updateVocationalTestDto: UpdateVocationalTestDto) {
    return `This action updates a #${id} vocationalTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} vocationalTest`;
  }
}
