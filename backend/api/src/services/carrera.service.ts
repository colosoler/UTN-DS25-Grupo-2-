import { Carrera, Anio, CreateCarreraRequest, UpdateCarreraRequest } from '../types/carrera.types';
import { Materia } from '../types/materia.types';
const materias: Materia[] = [
  {
    id: 1,
    nombre: 'Análisis Matemático',
    descripcion: 'Curso de matemáticas avanzadas',
    tipo: "anual"
  },
  {
    id: 2,
    nombre: 'Algoritmos',
    descripcion: 'Introducción a la programación',
    tipo: "anual"
  },
  {
    id: 3,
    nombre: 'Base de Datos',
    descripcion: 'Fundamentos de bases de datos',
    tipo: "primer cuatrimestre"
  }
]

const anios: Anio[] = [
  {
    numero: 1,
    materias: [materias[0], materias[1]]
  },
  {
    numero: 2,
    materias: [materias[2]]
  }
]

const carreras: Carrera[] = [
  {
    id: 1,
    nombre: 'Ingeniería en Sistemas',
    anios: anios
  },
  {
    id: 2,
    nombre: 'Ingeniería Electrónica',
    anios: anios
  },
  {
    id: 3,
    nombre: 'Ingeniería Civil',
    anios: anios
  },
  {
    id: 4,
    nombre: 'Ingeniería Industrial',
    anios: [ ...anios, {
      numero: 3,
      materias: [...materias, {
        id: 100,
        nombre: 'Redes de Computadoras',
        descripcion: 'Curso sobre redes y comunicaciones',
        tipo: "segundo cuatrimestre"
      }
      ]
    }]
  },
  {
    id: 5,
    nombre: 'Ingeniería Química',
    anios: anios
  },
  {
    id: 6,
    nombre: 'Ingeniería Mecánica',
    anios: anios
  },
  {
    id: 7,
    nombre: 'Ingeniería en Telecomunicaciones',
    anios: [ ...anios, {
      numero: 3,
      materias: [...materias, {
        id: 100,
        nombre: 'Redes de Computadoras',
        descripcion: 'Curso sobre redes y comunicaciones',
        tipo: "segundo cuatrimestre"
      }
      ]
    }]
  }
];

export async function getAllCarreras(): Promise<Carrera[]> {
  return carreras;
}
export async function getCarreraById(id: number): Promise<Carrera> {
  const carrera = carreras.find(c => c.id === id);
  if (!carrera) {
    const error = new Error('Carrera not found');
    (error as any).statusCode = 404;
    throw error;
  }
  return carrera;
}
export async function findCarreras(filters: any): Promise<Carrera[]> {
  return carreras.filter(carrera => {
    console.log("carrera: ", carrera);
    console.log("filters: ", filters);
    return Object.entries(filters).every(([key, value]) =>
      key === 'materia' &&
      carrera['anios'].some((anio: Anio) =>
        anio['materias'].some((materia: Materia) =>
          materia['id'] === parseInt(value as string)
      )))
  });
};



export async function createCarrera(data: CreateCarreraRequest): Promise<Carrera> {
  const newCarrera: Carrera = {
    id: carreras.length ? Math.max(...carreras.map(c => c.id)) + 1 : 1,
    ...data,
  };
  carreras.push(newCarrera);
  return newCarrera;
}

export async function updateCarrera(id: number, updateData: UpdateCarreraRequest): Promise<Carrera> {
  const index = carreras.findIndex(c => c.id === id);
  if (index === -1) {
    const error = new Error('Carrera not found');
    (error as any).statusCode = 404;
    throw error;
  }

  carreras[index] = {
    ...carreras[index],
    ...updateData
  };

  return carreras[index];
}

export async function deleteCarrera(id: string): Promise<void> {
  const index = carreras.findIndex(c => c.id === parseInt(id));
  if (index === -1) {
    const error = new Error('Carrera not found');
    (error as any).statusCode = 404;
    throw error;
  }
  carreras.splice(index, 1);
}


