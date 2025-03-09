import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { PsychologicalResponseItemDto } from './psychological-response-item.dto';

export class ResponsePsychologicalTestDto {
  @ApiProperty({
    description: 'Array of responses to psychological test questions',
    type: [PsychologicalResponseItemDto],
  })
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => PsychologicalResponseItemDto)
  responses: PsychologicalResponseItemDto[];
}
