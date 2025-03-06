import { Module } from '@nestjs/common';
import { VocationalTestsService } from './vocational-tests.service';
import { VocationalTestsController } from './vocational-tests.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VocationalTestsController],
  providers: [VocationalTestsService, PrismaService],
})
export class VocationalTestsModule {}
