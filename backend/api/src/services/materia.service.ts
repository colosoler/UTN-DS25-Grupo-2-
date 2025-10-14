import { CreateMateriaRequest, UpdateMateriaRequest } from '../types/materia.types';
import prisma from '../config/prisma';
import { Materia } from '@prisma/client';

// Retorna TODAS las materias (ordenadas en forma ascendente por nombre)
export async function getAllMaterias(): Promise<Materia[]> {
  return prisma.materia.findMany({
    orderBy: { nombre: 'asc' }
  });
}


// Retorna una materia por su ID
export async function getMateriaById(id: number): Promise<Materia> {
  const materia = await prisma.materia.findUnique({ where: { id } });
  if (!materia) {
    const error = new Error('Materia no encontrada');
    (error as any).statusCode = 404;
    throw error;
  }
  
  return materia;
}


// Crea una nueva materia, la agrega a la base de datos y la retorna al cliente
export async function createMateria(datosMateria: CreateMateriaRequest): Promise<Materia> {
  return prisma.materia.create({ data: datosMateria });
}

// Actualiza una materia en la base de datos
export async function updateMateria(id: number, datosNuevos: UpdateMateriaRequest): Promise<Materia> {
  try {
    return await prisma.materia.update({
      where: { id },
      data: datosNuevos
    });;
  } catch (e: any) {
    if (e.code === 'P2025') {
      const error = new Error('Materia no encontrada');
      (error as any).statusCode = 404;
      throw error;
    }
    throw e;
  }
}