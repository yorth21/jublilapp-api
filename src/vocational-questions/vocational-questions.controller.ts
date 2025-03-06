import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VocationalQuestionsService } from './vocational-questions.service';
import { CreateVocationalQuestionDto } from './dto/create-vocational-question.dto';
import { UpdateVocationalQuestionDto } from './dto/update-vocational-question.dto';

@Controller('vocational-questions')
export class VocationalQuestionsController {
  constructor(
    private readonly vocationalQuestionsService: VocationalQuestionsService,
  ) {}

  @Post()
  create(@Body() createVocationalQuestionDto: CreateVocationalQuestionDto) {
    return this.vocationalQuestionsService.create(createVocationalQuestionDto);
  }

  @Get()
  findAll() {
    return this.vocationalQuestionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vocationalQuestionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVocationalQuestionDto: UpdateVocationalQuestionDto,
  ) {
    return this.vocationalQuestionsService.update(
      +id,
      updateVocationalQuestionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vocationalQuestionsService.remove(+id);
  }
}
