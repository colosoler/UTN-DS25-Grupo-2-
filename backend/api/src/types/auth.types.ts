import { User } from './user.types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserWithoutPassword extends Omit<User, 'password'> {} //Omit sirve para quitar el atributo password de user

export interface LoginResponse {
  data: {
    user: UserWithoutPassword;
    token: string;
  };
}
