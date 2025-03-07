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
import { ResLoginDto } from './dto/res-login.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Login user' })
  @ApiOkResponse({
    description: 'User logged in',
    type: ResLoginDto,
  })
  async login(@Body() data: LoginDto): Promise<ResLoginDto> {
    const userToken = await this.authService.validateUser(data);
    if (!userToken)
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    return { accessToken: userToken.accessToken, user: userToken.user };
  }
}
