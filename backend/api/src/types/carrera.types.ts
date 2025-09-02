import { Carrera, CarreraMateria, Materia } from '../generated/prisma';

export interface CreateCarreraRequest {
    nombre: string;
    icon: string;
    materias?: CarreraMateria[];
}
export interface UpdateCarreraRequest {
    nombre?: string;
    icon?: string;
}

export interface CarreraResponse {
  carrera: Carrera;
  message: string;
}

export interface CarrerasListResponse {
  carreras: Carrera[];
  total: number;
}