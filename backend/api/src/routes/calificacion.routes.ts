import { Router } from 'express';
import * as calificacionController from '../controllers/calificacion.controller';
import { validate } from '../middlewares/validation.middleware';
import { createCalificacionSchema, updateCalificacionSchema } from
	'../validations/calificacion.validation';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

//GET plural
router.get('/:materialId/calificaciones', authenticate, calificacionController.findCalificaciones);

//GET Singular
router.get('/:materialId/calificacion', authenticate, calificacionController.getCalificacionByMaterialAndUser);

router.post('/:materialId/calificacion', authenticate, validate(createCalificacionSchema),
	calificacionController.createCalificacionByMaterialAndUser);

router.put('/:materialId/calificacion', authenticate, validate(updateCalificacionSchema),
	calificacionController.updateCalificacionByMaterialAndUser);
    
router.delete('/:materialId/calificacion', authenticate, calificacionController.deleteCalificacionByMaterialAndUser);

export const calificacionRoutes = router;