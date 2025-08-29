import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { validate } from '../middlewares/validation.middleware';
import { createUserSchema, updateUserSchema } from '../validations/user.validation';

const router = Router();

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.post('/', validate(createUserSchema), 
userController.createUser);

router.put('/:id', validate(updateUserSchema), 
userController.updateUser);

router.delete('/:id', userController.deleteUser);

export const userRoutes = router;