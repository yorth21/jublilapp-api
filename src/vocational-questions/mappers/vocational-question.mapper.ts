import { VocationalQuestions } from '@prisma/client';
import { ResVocationalQuestionDto } from '../dto/res-vocational-question.dto';

export class VocationalQuestionMapper {
  static toResVocationalQuestionDto(
    vocationalQuestion: VocationalQuestions,
  ): ResVocationalQuestionDto {
    return {
      id: vocationalQuestion.id,
      question: vocationalQuestion.question,
      position: vocationalQuestion.position,
    };
  }
}
