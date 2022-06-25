import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { emailReg, jwtSalt, saltOrRounds } from 'src/variable';
const prisma = new PrismaClient();
export const encryptPassword = async (password) =>
  await bcrypt.hash(password, saltOrRounds);

export const emailAddressValidation = (email) => emailReg.test(email);

export const checkAccountAvailability = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'User Not Found',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
  return user;
};

export const checkPassword = async (payload) => {
  const { clientPassword, dbPassword } = payload;
  let isPasswordMatched = await bcrypt.compare(clientPassword, dbPassword);
  if (!isPasswordMatched) {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Wrong Password',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
  return true;
};

export const generateToken = async (user) => {
  return await jwt.sign(
    {
      id: user.id,
    },
    jwtSalt,
    {
      expiresIn: '7d',
    },
  );
};

export const loginReturnResponse = (payload) => {
  const { token, userInformation } = payload;
  return {
    token,
    user: {
      id: userInformation?.id,
      name: userInformation?.name,
    },
  };
};
