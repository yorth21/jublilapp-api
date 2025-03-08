import { VocationalAnswers } from '@prisma/client';

export class VocationalAnswerMapper {
  static toResVocationalAnswerDto(vocationalAnswer: VocationalAnswers) {
    return {
      id: vocationalAnswer.id,
      answer: vocationalAnswer.answer,
      questionId: vocationalAnswer.questionId,
      categoryId: vocationalAnswer.categoryId,
    };
  }
}
