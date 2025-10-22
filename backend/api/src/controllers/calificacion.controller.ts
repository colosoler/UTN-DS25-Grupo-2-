import { Request, Response, NextFunction } from 'express';
import { CalificacionesListResponse, CalificacionResponse, CreateCalificacionRequest, UpdateCalificacionRequest } from '../types/calificacion.types'; 
import * as calificacionService from '../services/calificacion.service';
import prisma from '../config/prisma';

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

export async function findCalificaciones(req: Request<{ materialId?: string }, {}, {}, any>,res: Response<CalificacionesListResponse>, next: NextFunction) {
	try {
		const { materialId } = req.params;
		const filters = { 
			...req.query, 
			materialId: materialId ? parseInt(materialId) : undefined 
		};
		const calificaciones = await calificacionService.findCalificaciones(filters);
		res.json({ calificaciones, total: calificaciones.length, message: 'Calificaciones retrieved successfully' });
	} catch (error) {
		next(error);
	}
}

//usa materialId (parametro) y espera userId implicito (GET singular)
export async function getCalificacionByMaterialAndUser(req: Request<{ materialId: string }>, res: Response, next: NextFunction) {
	try {
		const userId = req.user!.id; 
		const { materialId } = req.params;
		const calificacion = await calificacionService.getCalificacionByMaterialAndUser(parseInt(materialId), userId);

		if (calificacion) {
			res.json({ calificacion, message: 'Calificación retrieved successfully' });
		} else {
			const material = await prisma.material.findUnique({
				where: { id: parseInt(materialId)}
			})
			res.json({
				calificacion: null,
				material: material,
				message: 'Calificación no encontrada'
			});
		}
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

//usa materialId de params y espera userId implicito
export async function createCalificacionByMaterialAndUser(req: Request<{ materialId: string }, {}, CreateCalificacionRequest>, res: Response<CalificacionResponse>, next: NextFunction) {
	try {
		const userId = req.user!.id; 
		const { materialId } = req.params;
		const calificacion = await calificacionService.createCalificacionByMaterialAndUser({ materialId: parseInt(materialId), 
		userId,
		value: req.body.value
		});
		res.status(201).json({ calificacion: calificacion, message: 'Calificación created successfully' });
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

//usa materialId de params y espera userId implicito
export async function updateCalificacionByMaterialAndUser(req: Request<{ materialId: string }, {}, UpdateCalificacionRequest>, res: Response<CalificacionResponse>, next: NextFunction) {
	try {
		const userId = req.user!.id; 
		const { materialId } = req.params;
		const updatedCalificacion = await calificacionService.updateCalificacionByMaterialAndUser(parseInt(materialId), userId, req.body);
		res.json({ calificacion: updatedCalificacion, message: 'Calificación updated successfully' });
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

//usa materialId de params y espera userId implicito
export async function deleteCalificacionByMaterialAndUser(req: Request<{ materialId: string }>, res: Response, next: NextFunction) {
	try {
		const userId = req.user!.id; 
		const { materialId } = req.params;
		await calificacionService.deleteCalificacionByMaterialAndUser(parseInt(materialId), userId);
		res.json({ success:true, message: 'Calificación deleted successfully' }); 
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