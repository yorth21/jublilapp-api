import { PartialType } from '@nestjs/mapped-types';
import { CreateVocationalQuestionDto } from './create-vocational-question.dto';

export class UpdateVocationalQuestionDto extends PartialType(CreateVocationalQuestionDto) {}
