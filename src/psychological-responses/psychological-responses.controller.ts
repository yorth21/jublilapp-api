import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { PsychologicalResponsesService } from './psychological-responses.service';
import { ResponsePsychologicalTestDto } from './dto/response-psychological-test.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticatedRequest } from 'src/interfaces/authenticated-user.interface';
import { TestResultDto } from './dto/test-result.dto';
import { ResPsychologicalQuestionDto } from './dto/res-psychological-question.dto';

@ApiBearerAuth()
@Controller('psychological-responses')
export class PsychologicalResponsesController {
  constructor(
    private readonly psychologicalResponsesService: PsychologicalResponsesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Submit psychological test answers' })
  @ApiCreatedResponse({
    description: 'Test submitted successfully.',
    type: TestResultDto,
  })
  create(
    @Body() responseDto: ResponsePsychologicalTestDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.psychologicalResponsesService.create(responseDto, req.user.id);
  }

  @Get('questions')
  @ApiOperation({ summary: 'Get all psychological tests' })
  @ApiOkResponse({
    description: 'Return all tests.',
    type: ResPsychologicalQuestionDto,
    isArray: true,
  })
  async findAll() {
    return this.psychologicalResponsesService.findAllQuestions();
  }

  @Get('my-results')
  @ApiOperation({ summary: 'Get current user psychological test results' })
  @ApiOkResponse({
    description: 'Return test results if available.',
    type: TestResultDto,
  })
  async getMyResults(@Request() req: AuthenticatedRequest) {
    const results =
      await this.psychologicalResponsesService.findTestResultByUserId(
        req.user.id,
      );
    if (!results) {
      throw new BadRequestException(
        'You have not completed the psychological test yet.',
      );
    }
    return results;
  }

  @Get(':identification')
  @ApiOperation({ summary: 'Get psychological test by ID with results' })
  @ApiOkResponse({
    description: 'Return the test with results.',
    type: TestResultDto,
  })
  async findByUserIdentification(
    @Param('identification') identification: string,
  ) {
    const result =
      await this.psychologicalResponsesService.findTestResultByUserIdentification(
        identification,
      );

    if (!result) {
      throw new BadRequestException('Test not found.');
    }
    return result;
  }
}
