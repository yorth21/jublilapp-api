import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.users.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        birthDate: new Date(createUserDto.birthDate),
      },
    });

    return user;
  }

  findAll() {
    return this.prisma.users.findMany();
  }

  findOne(identification: string) {
    return this.prisma.users.findUnique({
      where: {
        identification,
      },
    });
  }

  update(identification: string, updateUserDto: UpdateUserDto) {
    return this.prisma.users.update({
      where: { identification },
      data: updateUserDto,
    });
  }
}
