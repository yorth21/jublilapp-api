import { PartialType } from '@nestjs/mapped-types';
import { CreateVocationalTestDto } from './create-vocational-test.dto';

export class UpdateVocationalTestDto extends PartialType(CreateVocationalTestDto) {}
