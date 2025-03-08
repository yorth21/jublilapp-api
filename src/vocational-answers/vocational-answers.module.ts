import { Module } from '@nestjs/common';
import { VocationalAnswersService } from './vocational-answers.service';
import { VocationalAnswersController } from './vocational-answers.controller';

@Module({
  controllers: [VocationalAnswersController],
  providers: [VocationalAnswersService],
})
export class VocationalAnswersModule {}
