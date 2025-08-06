import { Request, Response, NextFunction } from 'express';
import { Material, CreateMaterialRequest, UpdateMaterialRequest, MaterialResponse, MaterialsListResponse } from '../types/material.types';
import * as materialService from '../services/material.service';

export async function getAllMaterials(req: Request, res: Response<MaterialsListResponse>, next: NextFunction) {
  try {
    const filters = req.query;
    const materials = await materialService.findMaterials(filters);
    res.json({
      materials,
      total: materials.length,
      message: 'Materials retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
}




export async function createMaterial( req: Request<{}, MaterialResponse,CreateMaterialRequest>, res: Response<MaterialResponse>, next: NextFunction){
    try {
        const newMaterial = await materialService.createMaterial(req.body);
        res.status(201).json({
            material: newMaterial,
            message: 'Material created succesfully'
        });
    } catch (error) {
    next(error);
    }
}

export async function deleteMaterial(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        await materialService.deleteMaterial(id);
        res.status(204).send();
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
            message: 'Material updated successfully'
        });
    } catch (error) {
        next(error);
    }
}