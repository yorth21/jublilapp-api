import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { VocationalResponsesService } from './vocational-responses.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticatedRequest } from 'src/interfaces/authenticated-user.interface';
import { TestResultDto } from './dto/test-result.dto';
import { CreateVocationalTestDto } from './dto/create-vocational-test.dto';

@Controller('vocational-responses')
export class VocationalResponsesController {
  constructor(
    private readonly vocationalResponsesService: VocationalResponsesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Response vocational test' })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: TestResultDto,
  })
  create(
    @Body() responsesTest: CreateVocationalTestDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.vocationalResponsesService.create(
      responsesTest.responses,
      req.user.id,
    );
  }

  @Get('by-user/:identification')
  @ApiOperation({ summary: 'Get all responses by user identification' })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'List of all responses by user',
    type: TestResultDto,
    isArray: true,
  })
  findByUser(@Param('identification') identification: string) {
    return this.vocationalResponsesService.findTestResultByUserIdentification(
      identification,
    );
  }
}
