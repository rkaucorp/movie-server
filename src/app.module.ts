import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { CreateMiddleware } from './users/duplicate-account.middleware';
import { TokenVerifyMiddleware } from './users/tokenVerify.middleware';
import { UserValidationMiddleware } from './users/user-validation.middleware';

@Module({
  imports: [PrismaModule, UsersModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserValidationMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST });
    consumer
      .apply(CreateMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST });
    consumer
      .apply(TokenVerifyMiddleware)
      .forRoutes({ path: 'users/:id', method: RequestMethod.PATCH });
    consumer
      .apply(TokenVerifyMiddleware)
      .forRoutes({ path: 'movies', method: RequestMethod.POST });
  }
}
