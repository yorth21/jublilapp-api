import { Users } from '@prisma/client';
import { ResUserDto } from '../dto/res-user.dto';

export class UserMapper {
  static toResUserDto(user: Users): ResUserDto {
    return {
      id: user.id,
      names: user.names,
      lastNames: user.lastNames,
      email: user.email,
      identification: user.identification,
      birthDate: user.birthDate,
      address: user.address,
      phone: user.phone,
      gender: user.gender,
      job: user.job,
      isAdmin: user.isAdmin,
    };
  }
}
