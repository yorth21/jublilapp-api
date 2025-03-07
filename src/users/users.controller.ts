import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':identification')
  findOne(@Param('identification') identificacion: string) {
    return this.usersService.findOne(identificacion);
  }

  @Patch(':identification')
  update(
    @Param('identification') identification: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(identification, updateUserDto);
  }
}
