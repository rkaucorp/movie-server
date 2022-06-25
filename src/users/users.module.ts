import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [MoviesModule],
})
export class UsersModule {}
