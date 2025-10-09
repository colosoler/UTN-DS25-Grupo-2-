import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { validate } from '../middlewares/validation.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { createUserSchema, updateUserSchema } from '../validations/user.validation';


const router = Router();


router.get('/', authenticate, authorize('ADMIN'),userController.getAllUsers);


router.get('/:id', authenticate, userController.getUserById);


router.post('/', authenticate, authorize('ADMIN','USER'), validate(createUserSchema),
userController.createUser);


router.put('/:id', authenticate, authorize('ADMIN','USER'), validate(updateUserSchema),
userController.updateUser);


router.delete('/:id', authenticate, authorize('ADMIN','USER'), userController.deleteUser);
export const userRoutes = router;