import { Router } from 'express';
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

router.post('/', carreraController.createCarrera);

router.put('/:id', carreraController.updateCarrera);

router.delete('/:id', carreraController.deleteCarrera);

export const carreraRoutes = router;