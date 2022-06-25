import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma.service';
import { emailAddressValidation } from 'src/utils';

@Injectable()
export class UserValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { email, password, name, operationType } = req.body;
    if (!emailAddressValidation(email)) {
      throw new BadRequestException('Invalid Email Address');
    } else if (!password) {
      throw new BadRequestException('Password Required');
    } else if (operationType === 'signup' && !name) {
      throw new BadRequestException('Name Required');
    } else {
      next();
    }
  }
}
