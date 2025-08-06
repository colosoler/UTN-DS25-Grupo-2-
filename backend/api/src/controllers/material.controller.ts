
import { Request, Response, NextFunction } from 'express';
import { Materials, CreateMaterialsRequest, UpdateMaterialsRequest } from '../types/materials.types';
import * as materialService from '../services/materials.service';

export async function getAllMaterials(req: Request, res:Response<MaterialsListResponse>, next: NextFunction) {
	try {
		const searchParams = req.query;
		const materials = await materialService.getAllMaterials(searchParams);
		res.json({
			materials,
		});
	} catch (error) {
		next(error);
	}
}

export async function getMaterialsByFilters(req: Request, res: Response<MaterialsListResponse>, next: NextFunction) {
	try {
		const searchParams = req.query as {
            query?: string;
            materia?: string;
            carrera?: string;
            comision?: string;
            parcial?: string;
            tipo?: string;
            user?: string;
        };
		const materials = await materialService.findMaterials(searchParams);
		res.json({
			materials,
			total: materials.length,
			message: 'Materiales filtrados recuperados exitosamente'
		});
	} catch (error) {
		next(error);
	}
}

export async function createMaterial( req: Request<{}, MaterialResponse,CreateMaterialRequest>, res: Response<MaterialResponse>, next: NextFunction){
    try {
        const newMaterial = await materialService.createMaterial(req.body);
        res.status(200).json({
            material: newMaterial,
            message: 'Material creado exitosamente'
        });
    } catch (error) {
    next(error);
    }
}

export async function deleteMaterial(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        await materialService.deleteMaterial(id);
        res.status(200).send();
    } catch (error) {
        next(error);
    }
}

export async function updateMaterial(req: Request<{ id: string }, MaterialResponse , UpdateMaterialRequest >, res: Response<MaterialResponse>, next: NextFunction){
    try {
        const { id } = req.params;
        const updatedMaterial = await materialService.updateMaterial(parseInt(id), req.body);
        res.json({
            material: updatedMaterial,
            message: 'Material actualizado exitosamente'
        });
    } catch (error) {
        next(error);
    }
}