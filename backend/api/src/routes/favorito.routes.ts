import { Router } from 'express';
import * as favoritoController from '../controllers/favorito.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticate, favoritoController.getUserFavorites);
router.get('/:materialId', authenticate, favoritoController.getFavorito);
router.post('/:materialId', authenticate, favoritoController.toggleFavorito);

export const favoritoRoutes = router;
