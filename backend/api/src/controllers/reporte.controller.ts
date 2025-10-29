import { Request, Response, NextFunction } from 'express';
import { ReportesListResponse, ReporteResponse, CreateReporteRequest, UpdateReporteRequest } from '../types/reporte.types'; 
import * as reporteService from '../services/reporte.service';
import prisma from '../config/prisma';

export async function getAllReportes(req: Request, res: Response<ReportesListResponse>, next: NextFunction) {
	try {
		const reportes = await reporteService.getAllReportes();
		res.json({ 
			reportes, 
			total: reportes.length, 
			message: 'Reportes retrieved successfully' 
		});
	} catch (error) { 
		next(error); 
	}
}

export async function findReportes(req: Request<{ materialId?: string }, {}, {}, any>,res: Response<ReportesListResponse>, next: NextFunction) {
	try {
		const { materialId } = req.params;
		const filters = { 
			...req.query, 
			materialId: materialId ? parseInt(materialId) : undefined 
		};
		const reportes = await reporteService.findReportes(filters);
		res.json({ reportes, total: reportes.length, message: 'Reportes retrieved successfully' });
	} catch (error) {
		next(error);
	}
}

export async function getReporteByMaterialAndUser(req: Request<{ materialId: string }>, res: Response, next: NextFunction) {
	try {
		const userId = req.user!.id; 
		const { materialId } = req.params;
		const reporte = await reporteService.getReporteByMaterialAndUser(parseInt(materialId), userId);

		if (reporte) {
			res.json({ reporte, message: 'Reporte retrieved successfully' });
		} else {
			const material = await prisma.material.findUnique({
				where: { id: parseInt(materialId)}
			})
			res.json({
				reporte: null,
				material: material,
				message: 'Reporte no encontrada'
			});
		}
	} catch (error) { 
		next(error); 
	}
}

export async function getReporteById(req: Request<{ id: string }>, res: Response<ReporteResponse>, next: NextFunction) {
	try {
		const { id } = req.params;
		const reporte = await reporteService.getReporteById(parseInt(id));
		res.json({ reporte, message: 'Reporte retrieved successfully' });
	} catch (error) { 
		next(error); 
	}
}

export async function createReporteByMaterialAndUser(req: Request<{ materialId: string }, {}, CreateReporteRequest>, res: Response<ReporteResponse>, next: NextFunction) {
	try {
		const userId = req.user!.id; 
		const { materialId } = req.params;
		const reporte = await reporteService.createReporteByMaterialAndUser({ materialId: parseInt(materialId), 
		userId,
		descripcion: req.body.descripcion,
		motivo: req.body.motivo,
		});
		res.status(201).json({ reporte: reporte, message: 'Reporte created successfully' });
	} catch (error) { 
		next(error); 
	}
}

export async function createReporte(req: Request<{}, {}, CreateReporteRequest>, res: Response<ReporteResponse>, next: NextFunction) {
	try {
		const reporte = await reporteService.createReporte(req.body);
		res.status(201).json({ reporte: reporte, message: 'Reporte created successfully' });
	} catch (error) { 
		next(error); 
	}
}

export async function updateReporteByMaterialAndUser(req: Request<{ materialId: string }, {}, UpdateReporteRequest>, res: Response<ReporteResponse>, next: NextFunction) {
	try {
		const userId = req.user!.id; 
		const { materialId } = req.params;
		const updatedReporte = await reporteService.updateReporteByMaterialAndUser(parseInt(materialId), userId, req.body);
		res.json({ reporte: updatedReporte, message: 'Reporte updated successfully' });
	} catch (error) { 
		next(error); 
	}
}

export async function updateReporte(req: Request<{ id: string }, {}, UpdateReporteRequest>, res: Response<ReporteResponse>, next: NextFunction) {
	try {
		const { id } = req.params;
		const updatedReporte = await reporteService.updateReporte(parseInt(id), req.body);
		res.json({ reporte: updatedReporte, message: 'Reporte updated successfully' });
	} catch (error) { 
		next(error); 
	}
}

export async function deleteReporteByMaterialAndUser(req: Request<{ materialId: string }>, res: Response, next: NextFunction) {
	try {
		const userId = req.user!.id; 
		const { materialId } = req.params;
		await reporteService.deleteReporteByMaterialAndUser(parseInt(materialId), userId);
		res.json({ success:true, message: 'Reporte deleted successfully' }); 
	} catch (error) { 
		next(error); 
	}
}

export async function deleteReporte(req: Request<{ id: string }>, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		await reporteService.deleteReporte(parseInt(id));
		res.json({ success:true, message: 'Reporte deleted successfully' }); 
	} catch (error) { 
		next(error); 
	}
}