import { CreateMaterialRequest, UpdateMaterialRequest } from '../types/material.types';
import prisma from '../config/prisma';
import { Material } from '@prisma/client';
import { Prisma } from '@prisma/client';
export async function getAllMaterials(): Promise<Material[]> {
  const materials = await prisma.material.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return materials;
}

  export async function findMaterials(filters: any): Promise<Material[]> {
	const query = filters.query as string | undefined;

	//separa filters en 2 partes: query (campos de texto) y directFilters (ids, para filtrarlos directamente)
	const { query: _, ...directFilters } = filters;

	//crea objeto con campos de directFilters asegurandose de q sean numeros (convirtiendolos de ser necesario)
	const numericDirectFilters: Record<string, number> = {};
	
	//crea objeto con campos string pero q deben filtrarse como filtros directos (comision y tipo)
	const textDirectFilters: Record<string, string> = {};

	for (const key in directFilters) {
		const value = directFilters[key];
		if (
			!isNaN(Number(value)) &&
			value !== '' &&
			value !== null &&
			value !== undefined
		) {
			numericDirectFilters[key] = Number(value); 	
		} else if (
			value !== '' &&
			value !== null &&
			value !== undefined
		) {
			textDirectFilters[key] = value;
		}
	}

	//construccion de arreglo de filtros para comparar en orden
	const maybeMateriaId = ('materiaId' in numericDirectFilters) ? { materiaId: numericDirectFilters['materiaId'] } : undefined;
	const maybeCarreraId = ('carreraId' in numericDirectFilters) ? { carreraId: numericDirectFilters['carreraId'] } : undefined;
	const maybeTipo = ('tipo' in textDirectFilters) ? { tipo: textDirectFilters['tipo'] } : undefined;
	const maybeAnoCursada = ('añoCursada' in numericDirectFilters) ? { añoCursada: numericDirectFilters['añoCursada'] } : undefined;
	const maybeComision = ('comision' in textDirectFilters) ? { comision: textDirectFilters['comision'] } : undefined;
	const maybeNumeroParcial = ('numeroParcial' in numericDirectFilters) ? { numeroParcial: numericDirectFilters['numeroParcial'] } : undefined;
	const maybeUserId = ('userId' in numericDirectFilters) ? { userId: numericDirectFilters['userId'] } : undefined;

	//array AND en el orden exacto
	const orderedDirectFilters = [
		maybeMateriaId,
		maybeCarreraId,
		maybeTipo,
		maybeAnoCursada,
		maybeComision,
		maybeNumeroParcial,
		maybeUserId
	].filter(f => f !== undefined) as Record<string, any>[];

	const queryTokens = query
		? query.split(/\s+/).filter(token => token.length > 0)
		: [];

  const textSearchFilter = queryTokens.length > 0 ?
      {
        OR: queryTokens.flatMap(token => [
          { titulo: { contains: token, mode: Prisma.QueryMode.insensitive } },
          { descripcion: { contains: token, mode: Prisma.QueryMode.insensitive } },
          { comision: { contains: token, mode: Prisma.QueryMode.insensitive } },
          { tipo: { contains: token, mode: Prisma.QueryMode.insensitive } },
        ])
      }
    : {};

	const finalTextFilterForAND = Object.keys(textSearchFilter).length > 0
		? {
			OR: textSearchFilter.OR
		}
		: {};

	const combinedFilters = [
		...orderedDirectFilters,
		...(Object.keys(finalTextFilterForAND).length > 0 ? [finalTextFilterForAND] : [])
	];

	return prisma.material.findMany({
		where: {
			AND: combinedFilters as any,
		},
	});
}

export async function getMaterialById(id: number): Promise<Material> {
  const material = await prisma.material.findUnique({ where: { id } });
  if (!material) {
    const error = new Error('Material not found');
    (error as any).statusCode = 404;
    throw error;
  }
  return material;
}

export async function createMaterial(data: CreateMaterialRequest): Promise<Material> {
  // Validar que el usuario existe
  const userExists = await prisma.user.findUnique({
    where: { id: data.userId }
  });
  
  if (!userExists) {
    const error = new Error('User not found');
    (error as any).statusCode = 400;
    throw error;
  }


  const created = await prisma.material.create({
    data: {
      añoCursada: data.añoCursada,
      archivo: data.archivo,
      comision: data.comision,
      descripcion: data.descripcion,
      numeroParcial: data.numeroParcial,
      titulo: data.titulo,
      materiaId: data.materiaId,
      carreraId: data.carreraId,
      tipo: data.tipo,
      userId: data.userId,
      cantidadReportes: 0
    }
  });
  return created;
}

export async function updateMaterial(id: number, updateData: UpdateMaterialRequest): Promise<Material> {
  // Validar que el usuario existe si se está actualizando
  if (updateData.userId !== undefined) {
    const userExists = await prisma.user.findUnique({
      where: { id: updateData.userId}
    });
    
    if (!userExists) {
      const error = new Error('User not found');
      (error as any).statusCode = 400;
      throw error;
    }
  }

  try {
    const updated = await prisma.material.update({
      where: { id },
      data: {
        ...(updateData.añoCursada !== undefined ? { añoCursada: updateData.añoCursada } : {}),
        ...(updateData.archivo !== undefined ? { archivo: updateData.archivo } : {}),
        ...(updateData.comision !== undefined ? { comision: updateData.comision } : {}),
        ...(updateData.descripcion !== undefined ? { descripcion: updateData.descripcion } : {}),
        ...(updateData.numeroParcial !== undefined ? { numeroParcial: updateData.numeroParcial } : {}),
        ...(updateData.titulo !== undefined ? { titulo: updateData.titulo } : {}),
        ...(updateData.materiaId !== undefined ? { materiaId: updateData.materiaId } : {}),
        ...(updateData.carreraId !== undefined ? { carreraId: updateData.carreraId } : {}),
        ...(updateData.tipo !== undefined ? { tipo: updateData.tipo } : {}),
        ...(updateData.userId !== undefined ? { userId: updateData.userId } : {}),
        ...(updateData.upvotes !== undefined ? { upvotes: updateData.upvotes } : {}),
        ...(updateData.downvotes !== undefined ? { downvotes: updateData.downvotes } : {})
      }
    });
    return updated;
  } catch (e: any) {
    if (e.code === 'P2025') {
      const error = new Error('Material not found');
      (error as any).statusCode = 404;
      throw error;
    }
    throw e;
  }
}

export async function deleteMaterial(id: number): Promise<void> {
  try {
    await prisma.material.delete({
      where: { id }
    });
  } catch (e: any) {
    if (e.code === 'P2025') {
      const error = new Error('Material not found');
      (error as any).statusCode = 404;
      throw error;
    }
    throw e;
  }
}