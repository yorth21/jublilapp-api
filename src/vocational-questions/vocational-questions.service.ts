import { Injectable } from '@nestjs/common';
import { CreateVocationalQuestionDto } from './dto/create-vocational-question.dto';
import { UpdateVocationalQuestionDto } from './dto/update-vocational-question.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VocationalQuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createVocationalQuestionDto: CreateVocationalQuestionDto) {
    return 'This action adds a new vocationalQuestion';
  }

  findAll() {
    return this.prisma.vocationalQuestions.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} vocationalQuestion`;
  }

  update(id: number, updateVocationalQuestionDto: UpdateVocationalQuestionDto) {
    return `This action updates a #${id} vocationalQuestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} vocationalQuestion`;
  }
}
