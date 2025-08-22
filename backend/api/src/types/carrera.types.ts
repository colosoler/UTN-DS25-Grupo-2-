import { Carrera, CarreraMateria } from '../generated/prisma';

export interface CreateCarreraRequest {
    nombre: string;
    materias: CarreraMateria[];
}
export interface UpdateCarreraRequest {
    nombre?: string;
    materias?: CarreraMateria[];
}

export interface CarreraResponse {
  carrera: Carrera;
  message: string;
}

export interface CarrerasListResponse {
  carreras: Carrera[];
  total: number;
}