import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { TokenEntity } from './entities/token.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  async login(@Body() data: LoginDto): Promise<TokenEntity> {
    const userToken = await this.authService.validateUser(data);
    if (!userToken)
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    return { accessToken: userToken.accessToken, user: userToken.user };
  }
}
