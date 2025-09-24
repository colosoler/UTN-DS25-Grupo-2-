import { Router } from 'express';
import { signup } from '../controllers/signup.controller';
import { validate } from '../middlewares/validation.middleware';
import { createUserSchema } from '../validations/user.validation';

const router = Router();

router.post('/', validate(createUserSchema), signup);

export const signupRoutes = router;
