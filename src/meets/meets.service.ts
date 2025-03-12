import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMeetDto } from './dto/create-meet.dto';
import { PrismaService } from 'src/prisma.service';
import { MeetMapper } from './mappers/meet.mapper';
import { ResMeetDto } from './dto/res-meet.dto';

@Injectable()
export class MeetsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createMeetDto: CreateMeetDto,
    userId: number,
  ): Promise<ResMeetDto> {
    const meet = await this.prisma.meets.create({
      data: {
        userId: userId,
        date: createMeetDto.date,
        doctorName: createMeetDto.doctorName,
        description: createMeetDto.description,
        createdAt: new Date(),
      },
      include: { user: true },
    });

    const meetMapper = MeetMapper.toResMeetDto(meet);
    meetMapper.userNames = meet.user.names;

    return meetMapper;
  }

  async findAll(): Promise<ResMeetDto[]> {
    const meets = await this.prisma.meets.findMany({
      include: { user: true },
    });

    return meets.map((meet) => {
      const meetMapper = MeetMapper.toResMeetDto(meet);
      meetMapper.userNames = meet.user.names;

      return meetMapper;
    });
  }

  async findOne(id: number): Promise<ResMeetDto> {
    const meet = await this.prisma.meets.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!meet) {
      throw new NotFoundException(`Meet with id ${id} not found`);
    }

    const meetMapper = MeetMapper.toResMeetDto(meet);
    meetMapper.userNames = meet.user.names;

    return meetMapper;
  }

  async findByUserIdentification(
    identification: string,
  ): Promise<ResMeetDto[]> {
    const user = await this.prisma.users.findUnique({
      where: { identification },
    });

    if (!user) {
      throw new NotFoundException(
        `User with identification ${identification} not found`,
      );
    }

    const meets = await this.prisma.meets.findMany({
      where: { userId: user.id },
    });

    return meets.map((meet) => {
      const meetMapper = MeetMapper.toResMeetDto(meet);
      meetMapper.userNames = user.names;

      return meetMapper;
    });
  }
}
