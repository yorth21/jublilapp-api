import { Controller, Get } from '@nestjs/common';
import { LikertScalesService } from './likert-scales.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ResLikertScaleDto } from './dto/res-likert-scales.dto';

@Controller('likert-scales')
@ApiBearerAuth()
export class LikertScalesController {
  constructor(private readonly likertScalesService: LikertScalesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all likert scales' })
  @ApiOkResponse({
    description: 'List of all likert scales',
    type: ResLikertScaleDto,
    isArray: true,
  })
  findAll() {
    return this.likertScalesService.findAll();
  }
}
