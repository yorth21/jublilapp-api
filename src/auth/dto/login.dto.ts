import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'User identification number',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  identification: string;

  @ApiProperty({
    description: 'User password',
    example: '123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
