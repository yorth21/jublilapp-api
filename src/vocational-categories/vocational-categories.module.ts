import { Module } from '@nestjs/common';
import { VocationalCategoriesService } from './vocational-categories.service';
import { VocationalCategoriesController } from './vocational-categories.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VocationalCategoriesController],
  providers: [VocationalCategoriesService, PrismaService],
})
export class VocationalCategoriesModule {}
