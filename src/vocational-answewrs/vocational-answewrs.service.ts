import { Injectable } from '@nestjs/common';
import { CreateVocationalAnswewrDto } from './dto/create-vocational-answewr.dto';
import { UpdateVocationalAnswewrDto } from './dto/update-vocational-answewr.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VocationalAnswewrsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createVocationalAnswewrDto: CreateVocationalAnswewrDto) {
    return 'This action adds a new vocationalAnswewr';
  }

  findAll() {
    return this.prisma.vocationalAnswers.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} vocationalAnswewr`;
  }

  update(id: number, updateVocationalAnswewrDto: UpdateVocationalAnswewrDto) {
    return `This action updates a #${id} vocationalAnswewr`;
  }

  remove(id: number) {
    return `This action removes a #${id} vocationalAnswewr`;
  }
}
