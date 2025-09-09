import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginRequest, LoginResponse, UserWithoutPassword } from '../types/auth.types';


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


    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET no está configurado en las variables de entorno');
    }


    const tokenPayload = {
        id: user.id,
        email: user.email,
    };
   
    const signOptions: jwt.SignOptions = {
        expiresIn: Number(process.env.JWT_EXPIRES_IN) || 7200, // 7200 son 2h en segundos
    };


   
    const token = jwt.sign(tokenPayload, jwtSecret, signOptions);


    const { password: _, ...restUser } = user;
    const userWithoutPassword = restUser as unknown as UserWithoutPassword;
   
    return {
        user: userWithoutPassword,
        token
    };
}
