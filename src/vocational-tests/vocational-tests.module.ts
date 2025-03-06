import { Module } from '@nestjs/common';
import { VocationalTestsService } from './vocational-tests.service';
import { VocationalTestsController } from './vocational-tests.controller';

@Module({
  controllers: [VocationalTestsController],
  providers: [VocationalTestsService],
})
export class VocationalTestsModule {}
