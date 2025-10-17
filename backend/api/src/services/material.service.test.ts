import { createMaterial, deleteMaterial, findMaterials } from '../services/material.service';
import prisma from '../config/prisma';
import { CreateMaterialRequest } from '../types/material.types';
import { TipoMaterial, Material } from '@prisma/client';

jest.mock('../config/prisma', () => ({
	user: {
		findUnique: jest.fn(),
	},
	material: {
		create: jest.fn(),
		delete: jest.fn(),
		findMany: jest.fn(),
	}
}));

const mockMaterialData: CreateMaterialRequest = {
	añoCursada: 2024,
	archivo: 'path/to/file.pdf',
	comision: 'S41',
	descripcion: 'Apuntes de Parcial 1',
	numeroParcial: 1,
	titulo: 'Parcial 1 DS25',
	materiaId: 5,
	carreraId: 1,
	tipo: TipoMaterial.APUNTE,
	userId: 100,
};

const mockCreatedMaterial: Material = {
	id: 1,
	...mockMaterialData,
	cantidadReportes: 0,
	upvotes: 0,
	downvotes: 0,
	fecha: new Date(),
	createdAt: new Date(),
	updatedAt: new Date(),
};

describe('MaterialService - createMaterial', () => {

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('debe crear un material cuando el usuario existe', async () => {
		(prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: mockMaterialData.userId, name: 'TestUser' });
		(prisma.material.create as jest.Mock).mockResolvedValue(mockCreatedMaterial);

		const result = await createMaterial(mockMaterialData);

		expect(result).toEqual(mockCreatedMaterial);
		expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: mockMaterialData.userId } });
		expect(prisma.material.create).toHaveBeenCalledWith({
			data: {
				añoCursada: mockMaterialData.añoCursada,
				archivo: mockMaterialData.archivo,
				comision: mockMaterialData.comision,
				descripcion: mockMaterialData.descripcion,
				numeroParcial: mockMaterialData.numeroParcial,
				titulo: mockMaterialData.titulo,
				materiaId: mockMaterialData.materiaId,
				carreraId: mockMaterialData.carreraId,
				tipo: mockMaterialData.tipo,
				userId: mockMaterialData.userId,
				cantidadReportes: 0
			}
		});
	});

	test('debe lanzar error 400 cuando el usuario no existe', async () => {
		(prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
		const actAndAssert = createMaterial(mockMaterialData);
		await expect(actAndAssert).rejects.toThrow('User not found');
		await expect(actAndAssert).rejects.toHaveProperty('statusCode', 400);
		expect(prisma.material.create).not.toHaveBeenCalled();
	});
});

describe('MaterialService - deleteMaterial', () => {

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('debe eliminar un material cuando existe', async () => {
		const materialId = 1;
		(prisma.material.delete as jest.Mock).mockResolvedValue(mockCreatedMaterial);

		await deleteMaterial(materialId);

		expect(prisma.material.delete).toHaveBeenCalledWith({
			where: { id: materialId }
		});
	});

	test('debe lanzar error 404 cuando el material no existe', async () => {
		const materialId = 999;
		const prismaError = new Error('Record not found');
		(prismaError as any).code = 'P2025';

		(prisma.material.delete as jest.Mock).mockRejectedValue(prismaError);

		const actAndAssert = deleteMaterial(materialId);

		await expect(actAndAssert).rejects.toThrow('Material not found');
		await expect(actAndAssert).rejects.toHaveProperty('statusCode', 404);
		expect(prisma.material.delete).toHaveBeenCalledWith({
			where: { id: materialId }
		});
	});
});

describe('MaterialService - findMaterials', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	test('debe devolver los materiales que coincidadan con todos los filtros de búsqueda', async () => {
		(prisma.material.findMany as jest.Mock).mockResolvedValue([mockCreatedMaterial]);

		const result = await findMaterials({
			materiaId: mockCreatedMaterial.materiaId.toString(),
			carreraId: mockCreatedMaterial.carreraId.toString(),
			tipo: mockCreatedMaterial.tipo,
			añoCursada: mockCreatedMaterial.añoCursada.toString(),
			comision: mockCreatedMaterial.comision,
			numeroParcial: mockCreatedMaterial.numeroParcial?.toString() || ''
		});//los pongo toString pq asi llega desde los query params

		expect(result).toEqual([mockCreatedMaterial]);
		expect(prisma.material.findMany).toHaveBeenCalledWith({
			where: {
				AND: [
					{ materiaId: mockCreatedMaterial.materiaId },
					{ carreraId: mockCreatedMaterial.carreraId },
					{ tipo: mockCreatedMaterial.tipo },
					{ añoCursada: mockCreatedMaterial.añoCursada },
					{ comision: mockCreatedMaterial.comision },
					{ numeroParcial: mockCreatedMaterial.numeroParcial }
				]
			}
		});
	});
	test('debe filtrar por usuario cuando se proporciona userId', async () => {
		(prisma.material.findMany as jest.Mock).mockResolvedValue([mockCreatedMaterial]);
		const result = await findMaterials({ userId: mockCreatedMaterial.userId.toString() });

		expect(result).toEqual([mockCreatedMaterial]);
		expect(prisma.material.findMany).toHaveBeenCalledWith({
			where: {
				AND: [
					{ userId: mockCreatedMaterial.userId }
				]
			}
		});
	}
	);
	test('debe deolver los materiales con campos de texto que matchean parcialmente con la query', async () => {
		(prisma.material.findMany as jest.Mock).mockResolvedValue([mockCreatedMaterial]);
		const result = await findMaterials({ query: 'parcial' });
		expect(result).toEqual([mockCreatedMaterial]);
		expect(prisma.material.findMany).toHaveBeenCalledWith({
			where: {
				AND: [
					{
						OR: [
							{ titulo: { contains: 'parcial', mode: 'insensitive' } },
							{ descripcion: { contains: 'parcial', mode: 'insensitive' } },
							{ comision: { contains: 'parcial', mode: 'insensitive' } },
							{ tipo: { contains: 'parcial', mode: 'insensitive' } },
						]
					}
				]
			}
		});
	}
	);
	test('debe devolver un array vacío cuando no hay materiales que coincidan con todos los campos', async () => {
		(prisma.material.findMany as jest.Mock).mockResolvedValue([]);
		const result = await findMaterials({ ...mockCreatedMaterial, query: 'algo_que_no_coincide' });
		expect(result).toEqual([]);
	});
})