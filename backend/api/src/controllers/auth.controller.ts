import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { LoginRequest, LoginResponse } from '../types/auth.types';

export async function login(req: Request<{}, any, LoginRequest>, res: 
Response<LoginResponse>, next: NextFunction) {
console.log("Login Controller - req.body:", req.body);
   try {
       const result = await authService.login(req.body);
       res.json({
           success: true,
           data: result
       });
   } catch (error) { next(error); }
}