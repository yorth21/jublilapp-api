import { ApiProperty } from '@nestjs/swagger';
import { ResponseVocationalTestDto } from './response-vocational-test.dto';

export class CreateVocationalTestDto {
  @ApiProperty({
    description: 'List of responses for the vocational test',
    type: ResponseVocationalTestDto,
    isArray: true,
  })
  responses: ResponseVocationalTestDto[];
}
