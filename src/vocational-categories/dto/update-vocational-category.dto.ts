import { PartialType } from '@nestjs/mapped-types';
import { CreateVocationalCategoryDto } from './create-vocational-category.dto';

export class UpdateVocationalCategoryDto extends PartialType(CreateVocationalCategoryDto) {}
