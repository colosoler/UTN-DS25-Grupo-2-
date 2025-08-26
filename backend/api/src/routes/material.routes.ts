import { Router } from 'express';
import * as materialController from '../controllers/material.controller';
import { validate } from '../middlewares/validation.middleware';
import { createMaterialSchema, updateMaterialSchema } from '../validations/material.validation';

const router = Router();

router.get('/', (req, res, next) => {
    if (Object.keys(req.query).length > 0) {
        materialController.findMaterials(req, res, next);
    } else {
        materialController.getAllMaterials(req, res, next);
    }
});

router.get('/:id', materialController.getMaterialById);

router.post('/', validate(createMaterialSchema), materialController.createMaterial);

router.put('/:id', validate(updateMaterialSchema), materialController.updateMaterial);

router.delete('/:id', materialController.deleteMaterial);

export const materialRoutes = router;