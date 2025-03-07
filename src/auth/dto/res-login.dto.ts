import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ResUserDto } from 'src/users/dto/res-user.dto';

export class ResLoginDto {
  @ApiProperty({
    description: 'Access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty({
    description: 'User data',
    type: ResUserDto,
  })
  @IsNotEmpty()
  user: ResUserDto;
}
