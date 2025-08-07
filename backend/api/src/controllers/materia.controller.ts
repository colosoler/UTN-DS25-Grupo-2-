import { Request, Response, NextFunction } from 'express';
import { Materia, CreateMateriaRequest, UpdateMateriaRequest, MateriaResponse, MateriasListResponse } from '../types/materia.types';
import * as materiaService from '../services/materia.service'


// Controller que devuelve todas las materias
export async function getAllMaterias(req: Request, res: Response<MateriasListResponse>, next: NextFunction) {
  try {
    const materias = await materiaService.getAllMaterias();
    res.json( { materias, total: materias.length } );
  } catch (error) {
    next(error);
  }
}

// Controller que devuelve una materia por ID
export async function getMateriaById(req: Request, res: Response<MateriaResponse>, next: NextFunction) {
  try {
    const { id } = req.params;
    const materia = await materiaService.getMateriaById(parseInt(id));
    res.json( { materia, message: 'Materia encontrada' } );
  } catch (error) {
    next(error);
  }
}

// Controller que crea una nueva materia
export async function createMateria(
  req: Request<{}, MateriaResponse, CreateMateriaRequest>, 
  res: Response<MateriaResponse>, 
  next: NextFunction
) {
  try {
    const newMateria = await materiaService.createMateria(req.body);
    res.status(201).json( { materia: newMateria, message: 'Materia creada exitosamente' } );
  } catch (error) {
    next(error);
  }
}

// Controller que actualiza una materia existente
export async function updateMateria(
  req: Request<{ id: string }, MateriaResponse, UpdateMateriaRequest>,
  res: Response<MateriaResponse>,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const updatedMateria = await materiaService.updateMateria(parseInt(id), req.body);
    res.json({ materia: updatedMateria, message: 'Materia actualizada exitosamente' });
  } catch (error) {
    next(error);
  }
}