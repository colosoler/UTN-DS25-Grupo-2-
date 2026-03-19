import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { LoginRequest, LoginResponse, GoogleLoginRequest } from '../types/auth.types';

export async function login(req: Request<{}, any, LoginRequest>, res: 
Response<LoginResponse>, next: NextFunction) {
   try {
       const result = await authService.login(req.body);
       res.json({
           success: true,
           data: result
       });
   } catch (error) { next(error); }
}

export async function loginWithGoogle(req: Request<{}, any, GoogleLoginRequest>, res:
Response<LoginResponse>, next: NextFunction) {
   try {
       const result = await authService.loginWithGoogle(req.body.credential);
       res.json({
           success: true,
           data: result
       });
   } catch (error) { next(error); }
}