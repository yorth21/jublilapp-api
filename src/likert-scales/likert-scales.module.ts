import { Module } from '@nestjs/common';
import { LikertScalesService } from './likert-scales.service';
import { LikertScalesController } from './likert-scales.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LikertScalesController],
  providers: [LikertScalesService, PrismaService],
})
export class LikertScalesModule {}
