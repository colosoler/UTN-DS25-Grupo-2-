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