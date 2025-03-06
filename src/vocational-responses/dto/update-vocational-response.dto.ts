import { PartialType } from '@nestjs/mapped-types';
import { CreateVocationalResponseDto } from './create-vocational-response.dto';

export class UpdateVocationalResponseDto extends PartialType(CreateVocationalResponseDto) {}
