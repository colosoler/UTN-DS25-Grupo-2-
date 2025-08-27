import { Request, Response, NextFunction } from 'express';
import { CreateCarreraRequest, CarreraResponse, CarrerasListResponse} from '../types/carrera.types';
import * as carreraservice from '../services/carrera.service'


export async function getAllCarreras(req: Request, res: Response<CarrerasListResponse>, next: NextFunction) {
  try {
    const carreras = await carreraservice.getAllCarreras();
    res.json({ carreras, total: carreras.length });
  } catch (error) {
    next(error);
  }
}
export async function findCarreras(req: Request, res: Response<CarrerasListResponse>, next: NextFunction) {
  try {
    const filters = req.query;
    const carreras = await carreraservice.findCarreras(filters);
    res.json({ carreras, total: carreras.length });
  } catch (error) {
    next(error);
  }
}
export async function getCarreraById(req: Request, res: Response<CarreraResponse>, next: NextFunction) {
  try {
    const { id } = req.params;
    const carrera = await carreraservice.getCarreraById(parseInt(id));
    res.json({ carrera, message: 'Carrera encontrada' });
  } catch (error) {
    next(error);
  }
}

export async function createCarrera(
  req: Request<CreateCarreraRequest>,
  res: Response<CarreraResponse>,
  next: NextFunction
) {
  try {
    const newCarrera = await carreraservice.createCarrera(req.body);
    res.status(201).json({ carrera: newCarrera, message: 'Carrera creada exitosamente' });
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
