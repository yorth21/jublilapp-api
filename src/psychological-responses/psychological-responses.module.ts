import { Module } from '@nestjs/common';
import { PsychologicalResponsesService } from './psychological-responses.service';
import { PsychologicalResponsesController } from './psychological-responses.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PsychologicalResponsesController],
  providers: [PsychologicalResponsesService, PrismaService],
})
export class PsychologicalResponsesModule {}
