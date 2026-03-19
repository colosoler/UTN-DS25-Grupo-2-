import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginRequest, LoginResponse, UserWithoutPassword } from '../types/auth.types';
import { verifyGoogleCredential } from './google-auth.service';

type AuthUser = Awaited<ReturnType<typeof prisma.user.findUnique>> extends infer T
  ? NonNullable<T>
  : never;

function buildAuthData(user: AuthUser): LoginResponse['data'] {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET no está configurado en las variables de entorno');
    }

    const tokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role
    };

    const signOptions: jwt.SignOptions = {
        expiresIn: Number(process.env.JWT_EXPIRES_IN) || 7200,
    };

    const token = jwt.sign(tokenPayload, jwtSecret, signOptions);

    const { password: _, ...restUser } = user;
    const userWithoutPassword = restUser as unknown as UserWithoutPassword;

    return {
        user: userWithoutPassword,
        token
    };
}


export async function login(data: LoginRequest): Promise<LoginResponse['data']> {
    const user = await prisma.user.findUnique({
        where: { email: data.email }
    });
    if (!user) {
        const error = new Error('Las credenciales ingresadas no son válidas') as any;
        error.statusCode = 401;
        throw error;
    }


    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) {
        const error = new Error('Las credenciales ingresadas no son válidas') as any;
        error.statusCode = 401;
        throw error;
    }

    return buildAuthData(user);
}

export async function loginWithGoogle(credential: string): Promise<LoginResponse['data']> {
    const googleProfile = await verifyGoogleCredential(credential);

    const user = await prisma.user.findUnique({
        where: { email: googleProfile.email! }
    });

    if (!user) {
        const error = new Error('No existe una cuenta registrada con ese correo. Registrate primero con Google.') as any;
        error.statusCode = 404;
        throw error;
    }

    return buildAuthData(user);
}
