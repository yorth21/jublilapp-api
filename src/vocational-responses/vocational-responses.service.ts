import { Injectable } from '@nestjs/common';
import { CreateVocationalResponseDto } from './dto/create-vocational-response.dto';
import { UpdateVocationalResponseDto } from './dto/update-vocational-response.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VocationalResponsesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createVocationalResponseDto: CreateVocationalResponseDto) {
    return 'This action adds a new vocationalResponse';
  }

  findAll() {
    return this.prisma.vocationalResponses.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} vocationalResponse`;
  }

  update(id: number, updateVocationalResponseDto: UpdateVocationalResponseDto) {
    return `This action updates a #${id} vocationalResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} vocationalResponse`;
  }
}
