import { Request, Response, NextFunction } from 'express';
import * as materialService from '../services/material.service';
import { AuthenticatedRequest } from "../types/auth.types";
import {  CreateMaterialRequest } from '../types/material.types';
import { v2 as cloudinary } from 'cloudinary';

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

        if (!material) return res.status(404).json({ success: false, message: 'Material no encontrado' });

        // Devuelve la URL pública directamente
        res.json({
            success: true,
            data: material
        });
    } catch (error) {
        next(error);
    }
}


// controllers/material.controller.ts
// SUBIDA DE ARCHIVO PDF
export async function uploadMaterialFile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ success: false, message: 'No se envió ningún archivo.' });
    }

    const fileUrl = req.file.path;

    res.status(200).json({
      success: true,
      url: fileUrl,
      message: 'Archivo subido correctamente',
    });
  } catch (err) {
    next(err);
  }
}

// =====================
// Crear material
// =====================
export async function createMaterial(req: Request, res: Response, next: NextFunction) {
  try {
    const data = req.body as CreateMaterialRequest;

    // Convertir IDs a number
    const payload = {
      ...data,
      materiaId: Number(data.materiaId),
      carreraId: Number(data.carreraId),
      userId: Number(data.userId),
      añoCursada: Number(data.añoCursada),
      numeroParcial: data.numeroParcial ? Number(data.numeroParcial) : 0,
    };

    const newMaterial = await materialService.createMaterial(payload);

    res.status(201).json({
      success: true,
      data: newMaterial,
      message: 'Material creado correctamente',
    });
  } catch (error) {
    next(error);
  }
}



export async function deleteMaterial(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    console.log('Entrando a deleteMaterial');
    try {
        const id = parseInt(req.params.id);

        // Verifica que req.user exista
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'No autenticado' });
        }

        const userId = req.user.id;
        const userRole = req.user.role;

        // Buscar el material
        const material = await materialService.getMaterialById(id);
        if (!material) {
            return res.status(404).json({ success: false, message: 'Material not found' });
        }
        console.log('Material userId:', material.userId);
        console.log('Request userId:', userId, 'Role:', userRole);
        // Solo el dueño o admin puede eliminar
        if (material.userId !== userId && userRole !== 'ADMIN') {
            return res.status(403).json({ success: false, message: 'No tienes permisos para eliminar este material' });
        }

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
