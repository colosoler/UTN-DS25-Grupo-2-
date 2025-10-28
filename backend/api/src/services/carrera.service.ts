import  { Carrera}  from '@prisma/client';
import { CreateCarreraRequest } from '../types/carrera.types';
import prisma from '../config/prisma';

export async function getAllCarreras(): Promise<Carrera[]> {
  const carreras = await prisma.carrera.findMany();
  return carreras;
}
export async function getCarreraById(id: number): Promise<Carrera> {
  const carrera = await prisma.carrera.findUnique({
    where: { id },
    include: {
      materias:{
        select:{
          anio: true,
          materia: true
        },
        orderBy:{anio: 'asc'}
      }
    }
  });
  if (!carrera) {
    const error = new Error('Carrera not found');
    (error as any).statusCode = 404;
    throw error;
  }
  
  return carrera;
}
export async function findCarreras(filters: any): Promise<Carrera[]> {
  return filters.materia?await prisma.carrera.findMany({
    where: {
      materias: {
        some: {
          materia: {
              id: parseInt(filters.materia)
            }
          }
        }
      }
    }
    ):[];
};

export async function createCarrera(data: CreateCarreraRequest): Promise<Carrera> {
  const newCarrera = await prisma.carrera.create({
    data: {
      nombre: data.nombre,
      icon: data.icon,
      materias: {
        create: data.materias?.map(m => ({
          anio: m.anio,
          materia: {
            connect: { id: m.materiaId }
          }
        })) || []
      }
    }
  }
  );
  return newCarrera;
}
//no hay update pq con el many to many de materias se complica
export async function deleteCarrera(id: number): Promise<void> {
  const carrera = await prisma.carrera.delete({
    where: { id }
  });
  if (!carrera) {
    const error = new Error('Carrera not found');
    (error as any).statusCode = 404;
    throw error;
  }
}

export async function getCarreraMateriabyIds(carreraId: number, materiaId: number){
  return await prisma.carreraMateria.findFirstOrThrow({
    where: {
      carreraId,
      materiaId      
    }
  });
}
