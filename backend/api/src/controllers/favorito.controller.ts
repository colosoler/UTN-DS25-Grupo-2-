import { Request, Response, NextFunction } from 'express';
import * as favoritoService from '../services/favorito.service';

export async function getUserFavorites(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.id;
    const query = req.query.query as string | undefined;
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit as string) || 10));
    const result = await favoritoService.getUserFavorites(userId, query, page, limit);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function getFavorito(req: Request<{ materialId: string }>, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.id;
    const materialId = parseInt(req.params.materialId);
    const favorito = await favoritoService.getFavorito(userId, materialId);
    res.json({ isFavorite: !!favorito });
  } catch (error) {
    next(error);
  }
}

export async function toggleFavorito(req: Request<{ materialId: string }>, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.id;
    const materialId = parseInt(req.params.materialId);
    const result = await favoritoService.toggleFavorito(userId, materialId);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
