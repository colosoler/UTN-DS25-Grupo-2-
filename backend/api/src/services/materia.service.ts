import { Materia, CreateMateriaRequest, UpdateMateriaRequest } from '../types/materia.types';

// Datos de prueba temporales
const materias: Materia[] = [
  {
    id: 1,
    nombre: 'Análisis Matemático',
    descripcion: 'Curso de matemáticas avanzadas'
  },
  {
    id: 2,
    nombre: 'Algoritmos',
    descripcion: 'Introducción a la programación'
  },
  {
    id: 3,
    nombre: 'Base de Datos',
    descripcion: 'Fundamentos de bases de datos'
  }
]

// Retornar TODAS las materias
export async function getAllMaterias(): Promise<Materia[]> {
  return materias;
}


// Retorna una materia por su ID
export async function getMateriaById(id: number): Promise<Materia> {
  const materia = materias.find(m => m.id === id);
  if (!materia) {
    const error = new Error('Materia no encontrada');
    (error as any).statusCode = 404;
    throw error;
  }
  return materia;
}


// Crea una nueva materia, la agrega a la lista de materias y la retorna al cliente
export async function createMateria(datosMateria: CreateMateriaRequest): Promise<Materia> {
  const materia: Materia = {
    id: Math.max(...materias.map(m => m.id)) + 1,
    ...datosMateria,
  }
  materias.push(materia);
  return materia;
}

export async function updateMateria(id: number, datosNuevos: UpdateMateriaRequest): Promise<Materia> {
  const materiaIndex = materias.findIndex(m => m.id === id);
  if (materiaIndex === -1) {
    const error = new Error('Materia no encontrada');
    (error as any).statusCode = 404;
    throw error;
  }
  materias[materiaIndex] = { ...materias[materiaIndex], ...datosNuevos, id };
  return materias[materiaIndex];
}