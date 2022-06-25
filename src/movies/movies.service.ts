import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Movie } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}
  async create(movie: Movie) {
    try {
      const result = await this.prisma.movie.create({
        data: movie,
      });
      return result;
    } catch (error) {
      throw new HttpException(
        'Service Unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  findAll(payload): Promise<Movie[]> {
    const { skip, take } = payload;
    return this.prisma.movie.findMany({
      skip: parseInt(skip),
      take: parseInt(take),
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  getAllMovieByUser(user: number) {
    return this.prisma.movie.findMany({
      where: {
        userId: user,
      },
    });
  }
}
