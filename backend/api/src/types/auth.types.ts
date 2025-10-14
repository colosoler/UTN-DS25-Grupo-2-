import { User } from './user.types';
import { Request } from "express";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserWithoutPassword extends Omit<User, 'password'> {} //Omit sirve para quitar el atributo password de user

export interface LoginResponse {
  data: {
    user: UserWithoutPassword;
    token: string;
  }, 
  success: boolean;
}

export interface AuthenticatedUser {
  id: number;
  role: 'USER' | 'ADMIN'; 
  email: string;
  
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}