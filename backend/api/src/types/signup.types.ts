import { User } from './user.types';

export interface SignUpRequest {
    name: string;
    surname: string;
    email: string;
    username: string;
    password: string;
    careerId: number;
}

export interface UserWithoutPassword extends Omit<User, 'password'> {}

export interface SignUpResponse {
    data: {
        user: UserWithoutPassword;
        token: string;
    },
    success: boolean;
}