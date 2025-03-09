import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ResponsePsychologicalTestDto } from './dto/response-psychological-test.dto';
import { TestResultDto } from './dto/test-result.dto';
import { DimensionScoreDto } from './dto/dimension-score.dto';
import { PsychologicalDimensions } from '@prisma/client';

@Injectable()
export class PsychologicalResponsesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    responseDto: ResponsePsychologicalTestDto,
    userId: number,
  ): Promise<TestResultDto> {
    const existingTest = await this.prisma.psychologicalTests.findFirst({
      where: { userId },
    });

    if (existingTest) {
      throw new BadRequestException(
        'User has already completed the psychological test',
      );
    }

    const allQuestions = await this.prisma.psychologicalQuestions.findMany({
      include: { dimension: true },
    });

    const responseQuestionIds = new Set(
      responseDto.responses.map((r) => r.questionId),
    );

    if (responseQuestionIds.size !== allQuestions.length) {
      throw new BadRequestException(
        `All ${allQuestions.length} questions must be answered`,
      );
    }

    for (const response of responseDto.responses) {
      const question = allQuestions.find((q) => q.id === response.questionId);
      if (!question) {
        throw new BadRequestException(
          `Question with ID ${response.questionId} not found`,
        );
      }
    }

    const likertScales = await this.prisma.likertScales.findMany();

    for (const response of responseDto.responses) {
      const scale = likertScales.find((s) => s.id === response.scaleId);
      if (!scale) {
        throw new BadRequestException(
          `Likert scale with ID ${response.scaleId} not found`,
        );
      }
    }

    // Crear test y respuestas en una transacción
    const [savedTest] = await this.prisma.$transaction(async (prisma) => {
      // Crear el test
      const savedTest = await prisma.psychologicalTests.create({
        data: {
          userId,
        },
      });

      // Crear las respuestas
      for (const response of responseDto.responses) {
        await prisma.psychologicalResponses.create({
          data: {
            testId: savedTest.id,
            questionId: response.questionId,
            scaleId: response.scaleId,
          },
        });
      }

      return [savedTest];
    });

    // Calcular los resultados del test
    return await this.calculateTestResult(savedTest.id);
  }

  async calculateTestResult(testId: number): Promise<TestResultDto> {
    // Obtener el test con todas sus respuestas, incluyendo preguntas, dimensiones y escalas
    const test = await this.prisma.psychologicalTests.findUnique({
      where: { id: testId },
      include: {
        responses: {
          include: {
            question: {
              include: {
                dimension: true,
              },
            },
            scale: true,
          },
        },
      },
    });

    if (!test) {
      throw new BadRequestException(`Test with ID ${testId} not found`);
    }

    const dimensions = await this.prisma.psychologicalDimensions.findMany();

    const dimensionScores: Record<
      number,
      {
        total: number;
        count: number;
        dimension: PsychologicalDimensions;
      }
    > = {};

    // Inicializar todas las dimensiones
    dimensions.forEach((dimension) => {
      dimensionScores[dimension.id] = {
        total: 0,
        count: 0,
        dimension,
      };
    });

    // Sumar puntos por cada respuesta
    test.responses.forEach((response) => {
      const dimensionId = response.question.dimensionId;
      dimensionScores[dimensionId].total += response.scale.value;
      dimensionScores[dimensionId].count += 1;
    });

    // Calcular puntajes finales y generarr interpretaciones
    const finalDimensionScores: DimensionScoreDto[] = [];
    let totalScore = 0;
    let maxTotalScore = 0;

    for (const dimensionId in dimensionScores) {
      const { total, count, dimension } = dimensionScores[dimensionId];
      const maxScore = count * 5; // 5 es el valor máximo en la escala Likert
      const percentage = (total / maxScore) * 100;

      totalScore += total;
      maxTotalScore += maxScore;

      const interpretation = await this.getInterpretation(
        dimension.id,
        percentage,
      );

      finalDimensionScores.push({
        dimensionId: Number(dimensionId),
        name: dimension.name,
        description: dimension.description,
        score: total,
        maxScore,
        percentage: Math.round(percentage),
        interpretation,
      });
    }

    // Calcular porcentaje total
    const totalPercentage = (totalScore / maxTotalScore) * 100;

    // Generar interpretación general
    const overallInterpretation =
      await this.getOverallInterpretation(totalPercentage);

    // Ordenar por posición de la dimensión
    finalDimensionScores.sort((a, b) => {
      const dimA = dimensions.find((d) => d.id === a.dimensionId);
      const dimB = dimensions.find((d) => d.id === b.dimensionId);
      if (dimA && dimB) {
        return dimA.position - dimB.position;
      }
      return 0;
    });

    return {
      testId: test.id,
      userId: test.userId,
      createdAt: test.createdAt,
      dimensionScores: finalDimensionScores,
      totalScore,
      maxTotalScore,
      totalPercentage: Math.round(totalPercentage),
      overallInterpretation,
    };
  }

  private async getInterpretation(
    dimensionId: number,
    percentage: number,
  ): Promise<string> {
    // Niveles de interpretación
    const levels = await this.prisma.interpretationLevels.findMany();

    // Determinar nivel
    const level = levels.find((l) => percentage >= l.min && percentage < l.max);

    if (!level) {
      throw new BadRequestException(
        `Interpretation level not found for percentage ${percentage}`,
      );
    }

    // Obtener interpretaciones específicas
    const interpretations =
      await this.prisma.dimensionInterpretations.findFirst({
        where: {
          dimensionId,
          levelId: level.id,
        },
      });

    // Obtener interpretación específica o generar una general si la dimensión no está en el mapa
    return interpretations?.description || `Nivel ${level.level} de bienestar`;
  }

  private async getOverallInterpretation(percentage: number): Promise<string> {
    const interpretation = await this.prisma.overallInterpretations.findFirst({
      where: {
        percentage: {
          lte: percentage,
        },
      },
    });

    if (!interpretation) {
      throw new BadRequestException(
        `Overall interpretation not found for percentage ${percentage}`,
      );
    }

    return interpretation.description;
  }

  async findTestResultByUserId(userId: number): Promise<TestResultDto | null> {
    const test = await this.prisma.psychologicalTests.findFirst({
      where: { userId },
    });

    if (!test) {
      return null;
    }

    return await this.calculateTestResult(test.id);
  }

  async findTestResultByUserIdentification(
    identification: string,
  ): Promise<TestResultDto | null> {
    const user = await this.prisma.users.findFirst({
      where: { identification },
    });

    if (!user)
      throw new BadRequestException(
        `User with identification ${identification} not found`,
      );

    const test = await this.prisma.psychologicalTests.findFirst({
      where: { userId: user.id },
    });

    if (!test) {
      return null;
    }

    return await this.calculateTestResult(test.id);
  }

  async findAll() {
    return this.prisma.psychologicalTests.findMany({
      include: {
        user: {
          select: {
            id: true,
            names: true,
            email: true,
          },
        },
        responses: {
          include: {
            question: {
              include: {
                dimension: true,
              },
            },
            scale: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const test = await this.prisma.psychologicalTests.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            names: true,
            email: true,
          },
        },
      },
    });

    if (!test) {
      throw new BadRequestException(
        `Psychological test with ID ${id} not found`,
      );
    }

    return this.calculateTestResult(id);
  }
}
