import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ResUserDto } from './dto/res-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ResUserDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'List of all users',
    type: ResUserDto,
    isArray: true,
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':identification')
  @ApiOperation({ summary: 'Get a user by identification' })
  @ApiBearerAuth()
  findOne(@Param('identification') identificacion: string) {
    return this.usersService.findOne(identificacion);
  }

  @Patch(':identification')
  @ApiOperation({ summary: 'Update a user by identification' })
  @ApiBearerAuth()
  update(
    @Param('identification') identification: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(identification, updateUserDto);
  }
}
