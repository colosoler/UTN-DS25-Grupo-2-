export interface Materia {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface CreateMateriaRequest {
  nombre: string;
  descripcion: string;
}

export interface UpdateMateriaRequest {
  nombre?: string;
  descripcion?: string;
}

export interface MateriaResponse {
  materia: Materia;
  message: string;
}

export interface MateriasListResponse {
  materias: Materia[];
  total: number;
}