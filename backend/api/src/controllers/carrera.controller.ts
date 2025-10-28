import { Request, Response, NextFunction } from 'express';
import { Carrera } from '@prisma/client';
import { CreateCarreraRequest} from '../types/carrera.types';
import * as carreraservice from '../services/carrera.service'


export async function getAllCarreras(req: Request, res: Response<Carrera[]>, next: NextFunction) {
  try {
    const carreras = await carreraservice.getAllCarreras();
    res.json(carreras);
  } catch (error) {
    next(error);
  }
}
export async function findCarreras(req: Request, res: Response<Carrera[]>, next: NextFunction) {
  try {
    const filters = req.query;
    const carreras = await carreraservice.findCarreras(filters);
    res.json(carreras);
  } catch (error) {
    next(error);
  }
}
export async function getCarreraById(req: Request, res: Response<Carrera>, next: NextFunction) {
  try {
    const { id } = req.params;
    const carrera = await carreraservice.getCarreraById(parseInt(id));
    res.json(carrera);
  } catch (error) {
    next(error);
  }
}

export async function createCarrera(
  req: Request<{}, {},CreateCarreraRequest>,
  res: Response<Carrera>,
  next: NextFunction
) {
  try {
    const newCarrera = await carreraservice.createCarrera(req.body);
    res.status(201).json(newCarrera);
  } catch (error) {
    next(error);
  }
}

export async function deleteCarrera(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    await carreraservice.deleteCarrera(parseInt(id));
    res.status(200).json({ message: 'Carrera eliminada exitosamente' });
  } catch (error) {
    next(error);
  }
}

export async function getCarreraMateriabyIds(req: Request, res: Response, next: NextFunction) {
  try {
    const { carreraId, materiaId } = req.params as { carreraId: string; materiaId: string };
    const result = await carreraservice.getCarreraMateriabyIds(parseInt(carreraId), parseInt(materiaId));
    res.json(result);
  } catch (error) {
    next(error);
  }
}