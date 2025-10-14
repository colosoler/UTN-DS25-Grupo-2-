import { createMaterial } from '../services/material.service';
import prisma from '../config/prisma';
import { CreateMaterialRequest } from '../types/material.types';
import { TipoMaterial, Material } from '@prisma/client';

jest.mock('../config/prisma', () => ({
	user: {
		findUnique: jest.fn(),
	},
	material: {
		create: jest.fn(),
	}
}));

const mockMaterialData: CreateMaterialRequest = {
	añoCursada: 2024,
	archivo: 'path/to/file.pdf',
	comision: 'A',
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