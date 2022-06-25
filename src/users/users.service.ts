import {
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from 'src/variable';
import { PrismaService } from '../prisma.service';
import {
  checkAccountAvailability,
  checkPassword,
  encryptPassword,
  generateToken,
  loginReturnResponse,
} from '../utils';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(user: User) {
    try {
      delete user['operationType'];
      user['password'] = await encryptPassword(user?.password);
      const accountCreated = await this.prisma.user.create({
        data: user,
      });
      if (!accountCreated) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Server Busy',
          },
          HttpStatus.FORBIDDEN,
        );
      }
      return true;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Service Unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async login(user: User) {
    const existingUser = await checkAccountAvailability(user?.email);
    const data = {
      clientPassword: user?.password,
      dbPassword: existingUser?.password,
    };
    await checkPassword(data);
    const token = await generateToken(existingUser);
    const userInfo = { token, userInformation: existingUser };
    return loginReturnResponse(userInfo);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, user: User) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
