import { Controller, Get, Param } from '@nestjs/common';
import { VocationalQuestionsService } from './vocational-questions.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ResVocationalQuestionDto } from './dto/res-vocational-question.dto';

@Controller('vocational-questions')
export class VocationalQuestionsController {
  constructor(
    private readonly vocationalQuestionsService: VocationalQuestionsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all vocational questions' })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'List of all vocational questions',
    type: ResVocationalQuestionDto,
    isArray: true,
  })
  findAll() {
    return this.vocationalQuestionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a vocational question by id' })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Vocational question found',
    type: ResVocationalQuestionDto,
  })
  findOne(@Param('id') id: string) {
    return this.vocationalQuestionsService.findOne(+id);
  }
}
