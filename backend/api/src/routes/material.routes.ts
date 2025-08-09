import { Router } from 'express';
import * as materialController from '../controllers/material.controller';

const router = Router();

router.get('/', (req, res, next) => {
    if (Object.keys(req.query).length > 0) {
        materialController.findMaterials(req, res, next);
    } else {
        materialController.getAllMaterials(req, res, next);
    }
});

router.get('/', materialController.getMaterialById);

router.post('/', materialController.createMaterial);

router.put('/:id', materialController.updateMaterial);

router.delete('/:id', materialController.deleteMaterial);

export const materialRoutes = router;