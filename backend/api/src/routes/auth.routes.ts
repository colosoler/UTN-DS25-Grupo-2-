import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validate } from '../middlewares/validation.middleware';
import { loginSchema, googleLoginSchema } from '../validations/auth.validation';
import { validateRecaptcha } from '../middlewares/recaptcha.middleware';

const router = Router();

router.post('/login',
   validateRecaptcha,
   validate(loginSchema),
   authController.login
);

router.post('/google',
   validate(googleLoginSchema),
   authController.loginWithGoogle
);
export const authRoutes = router;
