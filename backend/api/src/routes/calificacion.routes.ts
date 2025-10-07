import { Router } from 'express';
import * as calificacionController from '../controllers/calificacion.controller';
import { validate } from '../middlewares/validation.middleware';
import { createCalificacionSchema, updateCalificacionSchema } from
	'../validations/calificacion.validation';

const router = Router();

//GET plural
router.get('/:materialId/calificaciones', calificacionController.findCalificaciones);

//GET Singular
router.get('/:materialId/calificacion', calificacionController.getCalificacionByMaterialAndUser);

router.post('/:materialId/calificacion', validate(createCalificacionSchema),
	calificacionController.createCalificacionByMaterialAndUser);

router.put('/:materialId/calificacion', validate(updateCalificacionSchema),
	calificacionController.updateCalificacionByMaterialAndUser);
    
router.delete('/:materialId/calificacion', calificacionController.deleteCalificacionByMaterialAndUser);

export const calificacionRoutes = router;