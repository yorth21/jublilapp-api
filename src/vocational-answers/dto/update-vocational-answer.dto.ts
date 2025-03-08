import { PartialType } from '@nestjs/swagger';
import { CreateVocationalAnswerDto } from './create-vocational-answer.dto';

export class UpdateVocationalAnswerDto extends PartialType(CreateVocationalAnswerDto) {}
