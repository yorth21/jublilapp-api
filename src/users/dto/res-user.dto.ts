import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDate,
  Length,
  Matches,
  IsBoolean,
} from 'class-validator';

export class ResUserDto {
  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'First name(s) of the user',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  names: string;

  @ApiProperty({
    description: 'Last name(s) of the user',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastNames: string;

  @ApiProperty({
    description: 'User identification number, between 8 and 20 characters',
    example: '12345678',
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  identification: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Physical address of the user',
    example: '123 Main St, Springfield',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Phone number of the user, exactly 10 digits',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{10}$/)
  phone: string;

  @ApiProperty({
    description: 'Birth date of the user in YYYY-MM-DD format',
    example: '1990-01-01',
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty({
    description: 'Gender of the user: M for male, F for female',
    example: 'M',
    enum: ['M', 'F'],
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 1)
  @Matches(/^[MF]$/)
  gender: string;

  @ApiProperty({
    description: 'Job title of the user',
    example: 'Software Engineer',
  })
  @IsString()
  @IsNotEmpty()
  job: string;

  @ApiProperty({
    description: 'User is an administrator',
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean;
}
