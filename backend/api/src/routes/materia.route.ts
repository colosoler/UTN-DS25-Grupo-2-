import { Router } from 'express';
import * as materiaController from '../controllers/materia.controller'

const router = Router();

// Ruta -> GET /materias
router.get('/', materiaController.getAllMaterias);

// Ruta -> GET /materias/:id
router.get('/:id', materiaController.getMateriaById);

// Ruta -> POST /materias
router.post('/', materiaController.createMateria);

// Ruta -> PUT /materias/:id
router.put('/:id', materiaController.updateMateria);

export const materiaRoutes = router;