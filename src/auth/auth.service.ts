import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(user: LoginDto) {
    const foundUser = await this.prisma.users.findUnique({
      where: { identification: user.identification },
    });

    if (!foundUser) return null;

    const isPasswordValid = await bcrypt.compare(
      user.password,
      foundUser.password,
    );

    if (isPasswordValid) {
      return this.jwtService.sign({
        id: foundUser.id,
        identification: foundUser.identification,
      });
    }
  }
}
