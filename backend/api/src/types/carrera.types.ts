import { Materia } from './materia.types';
export interface Anio{
    numero: number;
    materias: Materia[];
}
export interface Carrera {
    id: number;
    nombre: string;
    anios: Anio[];
}
export interface CreateCarreraRequest {
    nombre: string;
    anios: Anio[];
}
export interface UpdateCarreraRequest {
    nombre?: string;
    anios?: Anio[];
}

export interface CarreraResponse {
  carrera: Carrera;
  message: string;
}

export interface CarrerasListResponse {
  carreras: Carrera[];
  total: number;
}