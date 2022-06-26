import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
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
  findAll(
    @Param('skip') skip: number,
    @Param('take') take: number,
    @Request() req,
  ) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const { id } = jwt.decode(token);
    const data = { skip, take, id };
    return this.moviesService.findAll(data);
  }
}
