import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';
import { jwtSalt } from 'src/variable';

@Injectable()
export class TokenVerifyMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!req.headers['authorization']) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Missing Token',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const jwtVerify = await jwt.verify(token, jwtSalt);
    if (!jwtVerify) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid Token',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}
