import { CarreraMateria } from '@prisma/client';

export interface CreateCarreraRequest {
    nombre: string;
    icon: string;
    materias?: CarreraMateria[];
}
export interface UpdateCarreraRequest {
    nombre?: string;
    icon?: string;
}