import { Module } from '@nestjs/common';
import { VocationalResponsesService } from './vocational-responses.service';
import { VocationalResponsesController } from './vocational-responses.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VocationalResponsesController],
  providers: [VocationalResponsesService, PrismaService],
})
export class VocationalResponsesModule {}
