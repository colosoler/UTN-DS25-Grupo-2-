import { Router } from 'express';
import { signup, signupWithGoogle } from '../controllers/signup.controller';
import { validate } from '../middlewares/validation.middleware';
import { createUserSchema, googleSignupSchema } from '../validations/user.validation';

const router = Router();

router.post('/', validate(createUserSchema), signup);

router.post('/google', validate(googleSignupSchema), signupWithGoogle);

import bcrypt from 'bcrypt';
router.post('/hash',
    async (req,res,next) => {
        let hash = await bcrypt.hash(req.body.password, 10);
        console.log(hash);
        res.json(hash);
        next()
    })

export const signupRoutes = router;
