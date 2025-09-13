import { Router } from 'express';
import * as materiaController from '../controllers/materia.controller'
import { validate } from '../middlewares/validation.middleware'
import { createMateriaSchema, updateMateriaSchema } from '../validations/materia.validation';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

// Ruta -> GET /materias
router.get('/', materiaController.getAllMaterias);

// Ruta -> GET /materias/:id
router.get('/:id', materiaController.getMateriaById);

// Ruta -> POST /materias
router.post('/',  authenticate, authorize('ADMIN'), validate(createMateriaSchema), materiaController.createMateria);

// Ruta -> PUT /materias/:id
router.put('/:id',  authenticate, authorize('ADMIN'), validate(updateMateriaSchema), materiaController.updateMateria);

export const materiaRoutes = router;