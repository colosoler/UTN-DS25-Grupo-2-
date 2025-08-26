import { Request, Response, NextFunction } from 'express';
import * as materialService from '../services/material.service';

export async function getAllMaterials(req: Request, res: Response, next: NextFunction) {
    try {
        const materials = await materialService.getAllMaterials();
        res.json({ success: true, data: materials });
    } catch (error) {
        next(error);
    }
}

export async function findMaterials(req: Request, res: Response, next: NextFunction) {
    try {
        const filters = req.query;
        const materials = await materialService.findMaterials(filters);
        res.json({ success: true, data: materials });
    } catch (error) {
        next(error);
    }
}

export async function getMaterialById(req: Request, res: Response, next: NextFunction)  {
    try {
        const id = parseInt(req.params.id);
        const material = await materialService.getMaterialById(id);
        res.json({ success: true, data: material });
    } catch (error) {
        next(error);
    }
}

export async function createMaterial( req: Request, res: Response, next: NextFunction){
    try {
        const newMaterial = await materialService.createMaterial(req.body);
        res.status(201).json({ success: true, message: 'Material created succesfully', data: newMaterial });
    } catch (error) {
        next(error);
    }
}

export async function deleteMaterial(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id);
        await materialService.deleteMaterial(id);
        res.json({ success: true, message: 'Material deleted succesfully' });
    } catch (error) {
        next(error);
    }
}

export async function updateMaterial(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id);
        const updatedMaterial = await materialService.updateMaterial(id, req.body);
        res.json({ success: true, message: 'Material updated succesfully', data: updatedMaterial });
    } catch (error) {
        next(error);
    }
}