import { Router } from 'express';
import * as bookController from '../controllers/materia.controller'

const router = Router();

// Ruta -> GET /materias
router.get('/', bookController.getAllMaterias);

// Ruta -> GET /materias/:id
router.get('/:id', bookController.getMateriaById);

// Ruta -> POST /materias
router.post('/', bookController.createMateria);

// Ruta -> PUT /materias/:id
router.put('/:id', bookController.updateMateria);

export const materiaRoutes = router;