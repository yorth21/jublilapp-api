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
  @IsString()
  @IsNotEmpty()
  names: string;

  @IsString()
  @IsNotEmpty()
  lastNames: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 10)
  identification: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @Matches(/^\d{10}$/)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  birthDate: Date;

  @IsString()
  @Matches(/^[MF]$/)
  gender: string;

  @IsString()
  @IsNotEmpty()
  job: string;
}
