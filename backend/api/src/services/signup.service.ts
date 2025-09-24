import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SignUpRequest, SignUpResponse, UserWithoutPassword } from '../types/signup.types';

export async function signup(data: SignUpRequest): Promise<SignUpResponse['data']> {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email }
  });

  if (existingUser) {
    const error = new Error('El email ya está registrado') as any;
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      surname: data.surname,
      username: data.username,
      email: data.email,
      password: hashedPassword,
      careerId: data.careerId, // asumimos que viene en SignUpRequest
    },
  });

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET no está configurado en las variables de entorno');
  }

  const tokenPayload = {
    id: user.id,
    email: user.email,
  };

  const signOptions: jwt.SignOptions = {
    expiresIn: Number(process.env.JWT_EXPIRES_IN) || 7200, // 2 horas en segundos
  };

  const token = jwt.sign(tokenPayload, jwtSecret, signOptions);

  const { password: _, ...restUser } = user;
  const userWithoutPassword = restUser as unknown as UserWithoutPassword;

  return {
    user: userWithoutPassword,
    token
  };
}
