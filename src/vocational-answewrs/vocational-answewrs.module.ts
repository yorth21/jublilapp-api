import { Module } from '@nestjs/common';
import { VocationalAnswewrsService } from './vocational-answewrs.service';
import { VocationalAnswewrsController } from './vocational-answewrs.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VocationalAnswewrsController],
  providers: [VocationalAnswewrsService, PrismaService],
})
export class VocationalAnswewrsModule {}
