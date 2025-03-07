import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDate,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  names: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastNames: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(8, 10)
  identification: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d{10}$/)
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty()
  @IsString()
  @Matches(/^[MF]$/)
  gender: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  job: string;
}
