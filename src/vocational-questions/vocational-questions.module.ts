import { Module } from '@nestjs/common';
import { VocationalQuestionsService } from './vocational-questions.service';
import { VocationalQuestionsController } from './vocational-questions.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VocationalQuestionsController],
  providers: [VocationalQuestionsService, PrismaService],
})
export class VocationalQuestionsModule {}
