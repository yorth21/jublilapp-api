import { Meets } from '@prisma/client';
import { ResMeetDto } from '../dto/res-meet.dto';

export class MeetMapper {
  static toResMeetDto(meet: Meets): ResMeetDto {
    return {
      id: meet.id,
      userId: meet.userId,
      date: meet.date,
      doctorName: meet.doctorName,
      description: meet.description,
      createdAt: meet.createdAt,
    };
  }
}
