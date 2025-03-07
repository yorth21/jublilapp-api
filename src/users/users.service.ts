import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { ResUserDto } from './dto/res-user.dto';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<ResUserDto> {
    const existingUser = await this.prisma.users.findFirst({
      where: {
        OR: [
          { identification: createUserDto.identification },
          { email: createUserDto.email },
        ],
      },
    });

    if (existingUser) {
      throw new BadRequestException(
        'User with this identification or email already exists',
      );
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.users.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        birthDate: new Date(createUserDto.birthDate),
      },
    });

    return UserMapper.toResUserDto(user);
  }

  async findAll(): Promise<ResUserDto[]> {
    const users = await this.prisma.users.findMany();
    return users.map((user) => UserMapper.toResUserDto(user));
  }

  async findOne(identification: string): Promise<ResUserDto | null> {
    const user = await this.prisma.users.findUnique({
      where: {
        identification,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `User with identification ${identification} not found`,
      );
    }

    return UserMapper.toResUserDto(user);
  }

  async update(
    identification: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResUserDto> {
    const user = await this.prisma.users.update({
      where: { identification },
      data: updateUserDto,
    });

    return UserMapper.toResUserDto(user);
  }
}
