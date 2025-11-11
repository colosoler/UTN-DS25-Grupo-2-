import { Router } from 'express';
import * as reporteController from '../controllers/reporte.controller';
import { validate } from '../middlewares/validation.middleware';
import { updateReporteSchema } from
    '../validations/reporte.validation';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/:materialId/reportes', authenticate, reporteController.findReportes);

router.get('/:materialId/reporte', reporteController.getReporteByMaterialAndUser);

router.post('/:materialId/reporte', authenticate,
    reporteController.createReporteByMaterialAndUser);

router.put('/:materialId/reporte', authenticate, validate(updateReporteSchema),
    reporteController.updateReporteByMaterialAndUser);
    
router.delete('/:materialId/reporte', authenticate, reporteController.deleteReporteByMaterialAndUser);

export const reporteRoutes = router;