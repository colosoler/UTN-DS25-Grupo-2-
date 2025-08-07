export interface Materia {
  id: number;
  nombre: string;
  descripcion: string;
  cuatrimestre: 1 | 2 | "anual";
}

export interface CreateMateriaRequest {
  nombre: string;
  descripcion: string;
  cuatrimestre: 1 | 2 | "anual";
}

export interface UpdateMateriaRequest {
  nombre?: string;
  descripcion?: string;
  cuatrimestre?: 1 | 2 | "anual";
}

export interface MateriaResponse {
  materia: Materia;
  message: string;
}

export interface MateriasListResponse {
  materias: Materia[];
  total: number;
}