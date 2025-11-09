import { CreateReporteRequest, UpdateReporteRequest } from '../types/reporte.types';
import prisma from '../config/prisma';
import { Reporte } from '@prisma/client';

export async function getAllReportes(): Promise<Reporte[]> {
	return prisma.reporte.findMany({
		include: { 
			user: true, 	
			material: true 	
		},
		orderBy: { 
			createdAt: 'desc' 
		}
	});
}

export async function getReporteById(id: number): Promise<Reporte> {
	const reporte = await prisma.reporte.findUnique({ 
		where: { id }, 
		include: { 
			user: true, 
			material: true 
		} 
	});
	if (!reporte) {
		const error = new Error('Reporte no encontrado') as any;
		error.statusCode = 404;
		throw error;
	}
	return reporte;
}

export async function getReporteByMaterialAndUser(materialId: number, userId: number): Promise<Reporte | null> {
	const reporte = await prisma.reporte.findUnique({ 
		where: { userId_materialId: { userId, materialId } }, 
		include: { user: true, material: true } 
	});
	return reporte;
}

export async function findReportes(filters: any): Promise<Reporte[]> {
	const userId = filters.userId as number | undefined;
	const materialId = filters.materialId as number | undefined;
	if (!userId && !materialId) return [];
	return prisma.reporte.findMany({
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

export async function createReporteByMaterialAndUser(data: CreateReporteRequest): Promise<Reporte> {
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

	const reporte = await prisma.reporte.create({
		data,
		include: { user: true, material: true},
	});

	await prisma.material.update({
		where: {id: data.materialId},
		data: {
			cantidadReportes: { increment: 1 },
		},
	});

	return reporte;
}

export async function createReporte(data: CreateReporteRequest): Promise<Reporte> {
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
	const reporte = await prisma.reporte.create({ 
		data, 
		include: { 
			user: true, 
			material: true 
		} 
	});
    await prisma.material.update({
		where: {id: data.materialId},
		data: {
			cantidadReportes: { increment: 1 },
		},
	});
    return reporte;
}

export async function updateReporteByMaterialAndUser(materialId: number, userId: number, data: UpdateReporteRequest): Promise<Reporte> {

	const existing = await prisma.reporte.findUnique({
		where: { userId_materialId: { userId, materialId }},
	});

	if (!existing) {
		const error = new Error('El material con ID ' + data.materialId + ' no existe') as any;
		error.statusCode = 404;
		throw error;
	}

	try {
		const updated = await prisma.reporte.update({
			where: { userId_materialId: { userId, materialId } },
			data,
			include: { user: true, material: true } 
		});
		return updated
	} catch (e: any) {
		if (e.code === 'P2025') {
			const error = new Error('Reporte no encontrado para este material y usuario') as any;
			error.statusCode = 404;
			throw error;
		}
		throw e;
	}
}

export async function updateReporte(id: number, data: UpdateReporteRequest): Promise<Reporte> {
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
		return await prisma.reporte.update({ 
			where: { id }, 
			data, 
			include: { 
				user: true, 
				material: true 
			} 
		});
	} catch (e: any) {
		if (e.code === 'P2025') {
			const error = new Error('Reporte no encontrado') as any;
			error.statusCode = 404;
			throw error;
		}
		throw e;
	}
}

export async function deleteReporteByMaterialAndUser(materialId: number, userId: number): Promise<void> {
	try {
		await prisma.reporte.delete({ where: { userId_materialId: { userId, materialId } } });

		await prisma.material.update({
			where: { id: materialId },
			data: {
				cantidadReportes: { decrement: 1 },
			},
		});
	} catch (e: any) {
		if (e.code === 'P2025') {
			const error = new Error('Reporte no encontrado para este material y usuario') as any;
			error.statusCode = 404;
			throw error;
		}
		throw e;
	}
}

export async function deleteReporte(id: number): Promise<void> {
	try {
		await prisma.reporte.delete({ where: { id } });
	} catch (e: any) {
		if (e.code === 'P2025') {
			const error = new Error('Reporte no encontrado') as any;
			error.statusCode = 404;
			throw error;
		}
		throw e;
	}
}