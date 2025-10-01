import { CreateCalificacionRequest, UpdateCalificacionRequest } from '../types/calificacion.types';
import prisma from '../config/prisma';
import { Calificacion} from '../generated/prisma';

export async function getAllCalificaciones(): Promise<Calificacion[]> {
    return prisma.calificacion.findMany({
        include: { 
            user: true,   
            material: true   
        },
        orderBy: { 
            createdAt: 'desc' 
        }
    });
}

export async function getCalificacionById(id: number): Promise<Calificacion> {
	const calificacion = await prisma.calificacion.findUnique({ 
		where: { id }, 
		include: { 
			user: true, 
			material: true 
		} 
	});
	if (!calificacion) {
		const error = new Error('Calificación no encontrada') as any;
		error.statusCode = 404;
		throw error;
	}
	return calificacion;
}

export async function findCalificaciones(filters: any): Promise<Calificacion[]> {
	const userId = filters.userId as number | undefined;
	const materialId = filters.materialId as number | undefined;
	if (!userId && !materialId) return [];
	return prisma.calificacion.findMany({
		where: {
			OR: [
				userId ? { userId } : {}, 
				materialId ? { materialId } : {},
			].filter(Boolean),
		},
		include: {
			user: true,
			material: true,
		},
	});
}

export async function createCalificacion(data: CreateCalificacionRequest): Promise<Calificacion> {
    const materialExists = await prisma.material.findUnique({ where: { id: data.materialId } });
	if (!materialExists) {
		const error = new Error('El material con ID ' + data.materialId + ' no existe') as any;
		error.statusCode = 404;
		throw error;
	}
    const userExists = await prisma.user.findUnique({ where: { id: data.userId } });
	if (!userExists) {
		const error = new Error('El usuario con ID ' + data.userId + ' no existe') as any;
		error.statusCode = 404;
		throw error;
	}
	return prisma.calificacion.create({ 
		data, 
        include: { 
			user: true, 
			material: true 
		} 
	});
}

export async function updateCalificacion(id: number, data: UpdateCalificacionRequest): Promise<Calificacion> {
	if (data.materialId) {
		const materialExists = await prisma.material.findUnique({ where: { id: data.materialId } });
		if (!materialExists) {
			const error = new Error('El material con ID ' + data.materialId + ' no existe') as any;
			error.statusCode = 404;
			throw error;
		}
	}
	if (data.userId) {
		const userExists = await prisma.user.findUnique({ where: { id: data.userId } });
		if (!userExists) {
			const error = new Error('El usuario con ID ' + data.userId + ' no existe') as any;
			error.statusCode = 404;
			throw error;
		}
	}
	try {
		return await prisma.calificacion.update({ 
			where: { id }, 
			data, 
            include: { 
				user: true, 
				material: true 
			} 
		});
	} catch (e: any) {
		if (e.code === 'P2025') {
			const error = new Error('Calificación no encontrada') as any;
			error.statusCode = 404;
			throw error;
		}
		throw e;
	}
}

export async function deleteCalificacion(id: number): Promise<void> {
	try {
		await prisma.calificacion.delete({ where: { id } });
	} catch (e: any) {
		if (e.code === 'P2025') {
			const error = new Error('Calificación no encontrada') as any;
			error.statusCode = 404;
			throw error;
		}
		throw e;
	}
}