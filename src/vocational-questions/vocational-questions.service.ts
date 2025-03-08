import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ResVocationalQuestionDto } from './dto/res-vocational-question.dto';
import { VocationalQuestionMapper } from './mappers/vocational-question.mapper';
import { VocationalAnswerMapper } from 'src/vocational-answers/mappers/vocational-answer.mapper';

@Injectable()
export class VocationalQuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ResVocationalQuestionDto[]> {
    const questions = await this.prisma.vocationalQuestions.findMany({
      include: {
        answers: true,
      },
    });

    return questions.map((question) => {
      const questionMapper =
        VocationalQuestionMapper.toResVocationalQuestionDto(question);

      questionMapper.answers = question.answers.map((answer) => {
        return VocationalAnswerMapper.toResVocationalAnswerDto(answer);
      });

      return questionMapper;
    });
  }

  async findOne(id: number): Promise<ResVocationalQuestionDto> {
    const question = await this.prisma.vocationalQuestions.findUnique({
      where: { id },
      include: {
        answers: true,
      },
    });

    if (!question) {
      throw new NotFoundException(`Question with id ${id} not found`);
    }

    const questionMapper =
      VocationalQuestionMapper.toResVocationalQuestionDto(question);

    questionMapper.answers = question.answers.map((answer) => {
      return VocationalAnswerMapper.toResVocationalAnswerDto(answer);
    });

    return questionMapper;
  }
}
