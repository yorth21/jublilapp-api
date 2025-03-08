import { Controller, Get, Param } from '@nestjs/common';
import { VocationalAnswersService } from './vocational-answers.service';

@Controller('vocational-answers')
export class VocationalAnswersController {
  constructor(
    private readonly vocationalAnswersService: VocationalAnswersService,
  ) {}

  @Get()
  findAll() {
    return this.vocationalAnswersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vocationalAnswersService.findOne(+id);
  }
}
