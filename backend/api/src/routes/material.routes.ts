import { Router } from 'express';
import * as materialController from '../controllers/material.controller';
const router = Router();

router.get('/', materialController.getAllMaterials);

router.post('/', materialController.createMaterial);

router.put('/:id', materialController.updateMaterial);

router.delete('/:id', materialController.deleteMaterial);

export const materialRoutes = router;