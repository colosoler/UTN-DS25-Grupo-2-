import { Materia } from './materia.types';
interface Anio{
    numero: number;
    materias: Materia[];
}
export interface Carrera {
    id: number;
    nombre: string;
    anios: Anio[];
}