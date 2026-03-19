import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { SignUpRequest, SignUpResponse, UserWithoutPassword, GoogleSignUpRequest } from '../types/signup.types';
import { verifyGoogleCredential } from './google-auth.service';

function buildJwt(user: { id: number; email: string; role: 'USER' | 'ADMIN' }) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET no está configurado en las variables de entorno');
  }

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    jwtSecret,
    {
      expiresIn: Number(process.env.JWT_EXPIRES_IN) || 7200,
    }
  );
}

async function buildSignupResponse(user: {
  id: number;
  email: string;
  role: 'USER' | 'ADMIN';
  password: string;
}) {
  const freshUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!freshUser) {
    throw new Error('No se pudo recuperar el usuario creado');
  }

  const token = buildJwt(freshUser);
  const { password: _, ...restUser } = freshUser;
  const userWithoutPassword = restUser as unknown as UserWithoutPassword;

  return {
    user: userWithoutPassword,
    token
  };
}

function slugifyUsername(value: string): string {
  const normalized = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

  return normalized || `usuario_${Date.now()}`;
}

async function generateUniqueUsername(base: string): Promise<string> {
  const normalizedBase = slugifyUsername(base).slice(0, 40);
  let candidate = normalizedBase;
  let suffix = 1;

  while (await prisma.user.findUnique({ where: { username: candidate } })) {
    candidate = `${normalizedBase}_${suffix}`.slice(0, 50);
    suffix += 1;
  }

  return candidate;
}

export async function signup(data: SignUpRequest): Promise<SignUpResponse['data']> {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: data.email },
        { username: data.username }
      ]
    }
  });

  if (existingUser && existingUser.email === data.email) {
    const error = new Error('El email ya está registrado') as any;
    error.statusCode = 409;
    throw error;
  }

  if (existingUser && existingUser.username === data.username) {
    const error = new Error('El nombre de usuario ya está registrado') as any;
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

  return buildSignupResponse(user);
}

export async function signupWithGoogle(data: GoogleSignUpRequest): Promise<SignUpResponse['data']> {
  const googleProfile = await verifyGoogleCredential(data.credential);

  const existingUser = await prisma.user.findUnique({
    where: { email: googleProfile.email! }
  });

  if (existingUser) {
    const error = new Error('El email ya está registrado. Iniciá sesión con Google.') as any;
    error.statusCode = 409;
    throw error;
  }

  const usernameBase = googleProfile.email!.split('@')[0] || googleProfile.name || 'usuario';
  const username = await generateUniqueUsername(usernameBase);
  const generatedPassword = crypto.randomBytes(24).toString('hex') + 'Aa1';
  const hashedPassword = await bcrypt.hash(generatedPassword, 10);

  const fullName = (googleProfile.name || '').trim();
  const givenName = (googleProfile.given_name || fullName.split(' ')[0] || 'Usuario').trim();
  const familyName = (googleProfile.family_name || fullName.split(' ').slice(1).join(' ') || 'Google').trim();

  const user = await prisma.user.create({
    data: {
      name: givenName.slice(0, 50),
      surname: familyName.slice(0, 50),
      username,
      email: googleProfile.email!,
      password: hashedPassword,
      careerId: data.careerId,
      profilePicture: googleProfile.picture || null,
    },
  });

  return buildSignupResponse(user);
}
