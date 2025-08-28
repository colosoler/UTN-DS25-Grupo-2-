import { Router } from 'express';
import { createCarreraSchema } from '../validations/carrera.validation';
import { validate } from '../middlewares/validation.middleware';
import * as carreraController from '../controllers/carrera.controller'

const router = Router();

router.get('/', (req, res, next) => {
    if (Object.keys(req.query).length > 0) {
        carreraController.findCarreras(req, res, next);
    } else {
        carreraController.getAllCarreras(req, res, next);
    }
});

router.get('/:id', carreraController.getCarreraById);

router.post('/', validate(createCarreraSchema), carreraController.createCarrera);

router.delete('/:id', carreraController.deleteCarrera);

export const carreraRoutes = router;