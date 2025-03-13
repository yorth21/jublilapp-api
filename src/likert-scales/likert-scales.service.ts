import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ResLikertScaleDto } from './dto/res-likert-scales.dto';

@Injectable()
export class LikertScalesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ResLikertScaleDto[]> {
    const scales = await this.prisma.likertScales.findMany();

    return scales.map((scale) => {
      const scaleMapper = {
        id: scale.id,
        name: scale.name,
      };

      return scaleMapper;
    });
  }
}
