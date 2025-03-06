import { PartialType } from '@nestjs/mapped-types';
import { CreateVocationalAnswewrDto } from './create-vocational-answewr.dto';

export class UpdateVocationalAnswewrDto extends PartialType(CreateVocationalAnswewrDto) {}
