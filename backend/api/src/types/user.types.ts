import { Carrera } from '../generated/prisma'

export interface User {
    id: number;
    name: string;
    surname: string;
    careerId: number;
    username: string;
    email: string;
    role: 'USER' | 'ADMIN';
    password: string;
    career?: Carrera;
}

export interface UserData extends Omit<User, 'password' | 'role'> {}

export interface CreateUserRequest {
    name: string;
    surname: string;
    careerId: number;
    email: string;
    password: string;
    username: string;
    role: 'USER' | 'ADMIN';
}


export interface UpdateUserRequest {
    name?: string;
    surname?: string;
    careerId?: number;
    email?: string;
    password?: string;
    username?: string;
}
