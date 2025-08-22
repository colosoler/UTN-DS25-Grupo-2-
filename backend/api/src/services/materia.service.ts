import { CreateMateriaRequest, UpdateMateriaRequest } from '../types/materia.types';
import prisma from '../config/prisma';
import { Materia } from '../generated/prisma';


// Datos de prueba temporales
// const materias: Materia[] = [
//   {
//     id: 1,
//     nombre: 'Análisis Matemático',
//     descripcion: 'Curso de matemáticas avanzadas'
//   },
//   {
//     id: 2,
//     nombre: 'Algoritmos',
//     descripcion: 'Introducción a la programación'
//   },
//   {
//     id: 3,
//     nombre: 'Base de Datos',
//     descripcion: 'Fundamentos de bases de datos'
//   }
// ]

// Retorna TODAS las materias (ordenadas en forma ascendente por nombre)
export async function getAllMaterias(): Promise<Materia[]> {
  const materias = await prisma.materia.findMany({
    orderBy: { nombre: 'asc' }
  });

  return materias;
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
  const materiaNueva = await prisma.materia.create({
    data: datosMateria
  });

  return materiaNueva;
}

// Actualiza una materia en la base de datos
export async function updateMateria(id: number, datosNuevos: UpdateMateriaRequest): Promise<Materia> {
  try {
    const materiaActualizada = await prisma.materia.update({
      where: { id },
      data: datosNuevos
    });
    return materiaActualizada;
  } catch (e: any) {
    if (e.code === 'P2025') {
      const error = new Error('Materia no encontrada');
      (error as any).statusCode = 404;
      throw error;
    }
    throw e;
  }
}