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
  if (!filters.query && !filters.userId) return [];

  const query = filters.query as string | undefined;
  const userId = filters.userId ? Number(filters.userId) : undefined;

  return prisma.material.findMany({
    where: {
      AND: [
        userId ? { userId } : {},
        query
          ? {
              OR: [
                { titulo: { contains: query, mode: Prisma.QueryMode.insensitive } },
                { descripcion: { contains: query, mode: Prisma.QueryMode.insensitive } },
                { comision: { contains: query, mode: Prisma.QueryMode.insensitive } },
                { materiaId: !isNaN(Number(query)) ? { equals: Number(query) } : undefined },
                { carreraId: !isNaN(Number(query)) ? { equals: Number(query) } : undefined },
              ].filter(Boolean),
            }
          : {},
      ],
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
        ...(updateData.archivo !== undefined ? { archivos: updateData.archivo } : {}),
        ...(updateData.comision !== undefined ? { comision: updateData.comision } : {}),
        ...(updateData.descripcion !== undefined ? { descripcion: updateData.descripcion } : {}),
        ...(updateData.numeroParcial !== undefined ? { numeroParcial: updateData.numeroParcial } : {}),
        ...(updateData.titulo !== undefined ? { titulo: updateData.titulo } : {}),
        ...(updateData.materiaId !== undefined ? { materiaId: updateData.materiaId } : {}),
        ...(updateData.carreraId !== undefined ? { carreraId: updateData.carreraId } : {}),
        ...(updateData.tipo !== undefined ? { tipo: updateData.tipo } : {}),
        ...(updateData.userId !== undefined ? { userId: updateData.userId } : {})
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

export async function incrementReportCount(id: number): Promise<Material> {
  try {
    const updated = await prisma.material.update({
      where: { id },
      data: {
        cantidadReportes: {
          increment: 1
        }
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

export async function incrementVote(materialId: number, value: boolean): Promise<void> {
  const campo = value ? 'upvotes' : 'downvotes';
  await prisma.material.update({
    where: { id: materialId },
    data: { [campo]: {increment: 1}},
  });
};

export async function decrementVote(materialId: number, value: boolean): Promise<void> {
  const campo = value ? 'upvotes' : 'downvotes';
  await prisma.material.update({
    where: { id: materialId },
    data: { [campo]: {decrement: 1}},
  });
};