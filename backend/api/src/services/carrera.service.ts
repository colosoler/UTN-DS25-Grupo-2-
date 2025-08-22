import  { Carrera, CarreraMateria}  from '../generated/prisma';
import { CreateCarreraRequest, UpdateCarreraRequest } from '../types/carrera.types';
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
        include: {
          materia: true,
        }
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
              id: parseInt(filters.materia as string)
            }
          }
        }
      }
    }
    ):[];
  
  /*carreras.filter(carrera => {
    console.log("carrera: ", carrera);
    console.log("filters: ", filters);
    return Object.entries(filters).every(([key, value]) =>
      key === 'materia' &&
      carrera['anios'].some((anio: Anio) =>
        anio['materias'].some((materia: Materia) =>
          materia['id'] === parseInt(value as string)
      )))
  });*/
};



export async function createCarrera(data: CreateCarreraRequest): Promise<Carrera> {
  const newCarrera = await prisma.carrera.create({
    data: {
      nombre: data.nombre,
      materias: {
        create: data.materias/*.map((cM: CarreraMateria) => ({
          materiaId: cM.materiaId,
          anio: cM.anio
        }))*/
      }
    },
  });
  return newCarrera;
}

export async function updateCarrera(id: number, updateData: UpdateCarreraRequest): Promise<Carrera> {
  const carrera = await prisma.carrera.update({
    where: { id },
    data: {
      nombre: updateData.nombre,
      materias: {
        upsert: {
          create: updateData.materias,
          update: updateData.materias
        }
      }
    },
    include: {
      materias: true
    }
  });
  return carrera;
}

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


