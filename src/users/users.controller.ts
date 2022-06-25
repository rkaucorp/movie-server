import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { MoviesService } from 'src/movies/movies.service';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  [x: string]: any;
  constructor(
    private readonly usersService: UsersService,
    private moviesService: MoviesService,
  ) {}

  @Post()
  create(@Body() user: User) {
    return this.usersService.create(user);
  }

  @Post('/login')
  login(@Body() user: User) {
    return this.usersService.login(user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/movies/:user')
  findAllMovieByUser(@Param('user') user: string) {
    return this.moviesService.getAllMovieByUser(parseInt(user));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: User) {
    return this.usersService.update(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
