import { Request, Response, NextFunction } from 'express';
import * as signupService from '../services/signup.service';
import { SignUpRequest, SignUpResponse } from '../types/signup.types';

export async function signup(
  req: Request<{}, any, SignUpRequest>,
  res: Response<SignUpResponse>,
  next: NextFunction
) {
  try {
    const result = await signupService.signup(req.body); // llamamos al service
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
}
