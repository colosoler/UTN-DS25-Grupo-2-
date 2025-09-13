import { Router } from 'express';
import * as materialController from '../controllers/material.controller';
import { validate } from '../middlewares/validation.middleware';
import { createMaterialSchema, updateMaterialSchema } from '../validations/material.validation';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', (req, res, next) => {
    if (Object.keys(req.query).length > 0) {
        materialController.findMaterials(req, res, next);
    } else {
        materialController.getAllMaterials(req, res, next);
    }
});

router.get('/:id', materialController.getMaterialById);

router.post('/', authenticate, authorize('ADMIN', 'USER'), validate(createMaterialSchema), materialController.createMaterial);

router.put('/:id', authenticate, authorize('ADMIN', 'USER'), validate(updateMaterialSchema), materialController.updateMaterial);

router.delete('/:id', authenticate, authorize('ADMIN', 'USER'), materialController.deleteMaterial);

export const materialRoutes = router;