import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie, Prisma } from '@prisma/client';
import { TokenVerifyMiddleware } from '../users/tokenVerify.middleware';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UseGuards(TokenVerifyMiddleware)
  create(@Body() movie: Movie) {
    return this.moviesService.create(movie);
  }

  @Get('/:skip/:take')
  findAll(@Param('skip') skip: number, @Param('take') take: number) {
    const data = { skip, take };
    return this.moviesService.findAll(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }
}
