import { Request, Response, NextFunction } from 'express';
import { CalificacionesListResponse, CalificacionResponse, CreateCalificacionRequest, UpdateCalificacionRequest } from '../types/calificacion.types'; 
import * as calificacionService from '../services/calificacion.service';

export async function getAllCalificaciones(req: Request, res: Response<CalificacionesListResponse>, next: NextFunction) {
	try {
		const calificaciones = await calificacionService.getAllCalificaciones();
		res.json({ 
			calificaciones, 
			total: calificaciones.length, 
			message: 'Calificaciones retrieved successfully' 
		});
	} catch (error) { 
        next(error); 
	}
}

export async function findCalificaciones(req: Request,res: Response<CalificacionesListResponse>, next: NextFunction) {
	try {
		const filters = req.query;
		const calificaciones = await calificacionService.findCalificaciones(filters);
		res.json({ calificaciones, total: calificaciones.length, message: 'Calificaciones retrieved successfully' });
	} catch (error) {
		next(error);
	}
}

export async function getCalificacionById(req: Request<{ id: string }>, res: Response<CalificacionResponse>, next: NextFunction) {
	try {
		const { id } = req.params;
		const calificacion = await calificacionService.getCalificacionById(parseInt(id));
		res.json({ calificacion, message: 'Calificación retrieved successfully' });
	} catch (error) { 
		next(error); 
	}
}

export async function createCalificacion(req: Request<{}, {}, CreateCalificacionRequest>, res: Response<CalificacionResponse>, next: NextFunction) {
	try {
		const calificacion = await calificacionService.createCalificacion(req.body);
		res.status(201).json({ calificacion: calificacion, message: 'Calificación created successfully' });
	} catch (error) { 
		next(error); 
	}
}

export async function updateCalificacion(req: Request<{ id: string }, {}, UpdateCalificacionRequest>, res: Response<CalificacionResponse>, next: NextFunction) {
	try {
		const { id } = req.params;
		const updatedCalificacion = await calificacionService.updateCalificacion(parseInt(id), req.body);
	    res.json({ calificacion: updatedCalificacion, message: 'Calificación updated successfully' });
	} catch (error) { 
		next(error); 
	}
}

export async function deleteCalificacion(req: Request<{ id: string }>, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		await calificacionService.deleteCalificacion(parseInt(id));
		res.json({ success:true, message: 'Calificación deleted successfully' }); 
	} catch (error) { 
		next(error); 
	}
}