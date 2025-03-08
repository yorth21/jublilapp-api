import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ResponseVocationalTestDto } from './dto/response-vocational-test.dto';
import { TestResultDto } from './dto/test-result.dto';
import { CategoryScoreDto } from './dto/category-score.dto';

@Injectable()
export class VocationalResponsesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    responsesTest: ResponseVocationalTestDto[],
    userId: number,
  ): Promise<TestResultDto> {
    const existingTest = await this.prisma.vocationalTests.findFirst({
      where: { userId },
    });

    if (existingTest) {
      throw new BadRequestException('User already answered the test');
    }

    const allQuestions = await this.prisma.vocationalQuestions.findMany();
    const questionIds = new Set(
      responsesTest.map((response) => response.questionId),
    );

    if (questionIds.size !== allQuestions.length) {
      throw new BadRequestException('All questions must be answered');
    }

    const questions = await this.prisma.vocationalQuestions.findMany({
      include: { answers: true },
    });

    const [savedTest] = await this.prisma.$transaction(async (prisma) => {
      const savedTest = await prisma.vocationalTests.create({
        data: {
          userId,
        },
      });

      for (const response of responsesTest) {
        const question = questions.find((q) => q.id === response.questionId);
        if (!question) {
          throw new BadRequestException(
            `Question with ID ${response.questionId} not found in the test`,
          );
        }

        const answer = question.answers.find((a) => a.id === response.answerId);
        if (!answer) {
          throw new BadRequestException(
            `Answer with ID ${response.answerId} not found in question ${response.questionId}`,
          );
        }

        await prisma.vocationalResponses.create({
          data: {
            testId: savedTest.id,
            answerId: answer.id,
          },
        });
      }

      return [savedTest];
    });

    return await this.calculateTestResult(savedTest.id);
  }

  async calculateTestResult(testId: number): Promise<TestResultDto> {
    const testResponses = await this.prisma.vocationalResponses.findMany({
      where: { testId },
      include: {
        answer: {
          include: {
            category: true,
          },
        },
      },
    });

    const categories = await this.prisma.vocationalCategories.findMany();

    const categoryScores: Record<number, CategoryScoreDto> = {};

    categories.forEach((category) => {
      categoryScores[category.id] = {
        categoryId: category.id,
        code: category.code,
        name: category.name,
        description: category.description,
        score: 0,
      };
    });

    testResponses.forEach((response) => {
      const categoryId = response.answer.categoryId;
      categoryScores[categoryId].score += 1;
    });

    const scores = Object.values(categoryScores).sort(
      (a, b) => b.score - a.score,
    );

    const dominantCategory = scores[0];
    const totalResponses = testResponses.length;
    const percentage = (dominantCategory.score / totalResponses) * 100;

    return {
      testId,
      scores,
      dominantCategory: {
        ...dominantCategory,
        percentage: Math.round(percentage),
      },
    };
  }

  async findTestResultByUserIdentification(
    identification: string,
  ): Promise<TestResultDto | null> {
    const user = await this.prisma.users.findFirst({
      where: { identification },
    });

    if (!user) {
      throw new BadRequestException(
        `User with identification ${identification} not found`,
      );
    }

    const test = await this.prisma.vocationalTests.findFirst({
      where: { userId: user.id },
    });

    if (!test) {
      return null;
    }

    return await this.calculateTestResult(test.id);
  }

  async findAll() {
    return this.prisma.vocationalResponses.findMany({
      include: {
        test: true,
        answer: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const response = await this.prisma.vocationalResponses.findUnique({
      where: { id },
      include: {
        test: true,
        answer: {
          include: {
            category: true,
            question: true,
          },
        },
      },
    });

    if (!response) {
      throw new BadRequestException(
        `Vocational response with ID ${id} not found`,
      );
    }

    return response;
  }
}
