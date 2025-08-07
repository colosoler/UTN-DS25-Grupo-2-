export interface Materia {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: "anual" | "primer cuatrimestre" | "segundo cuatrimestre";
}

export interface CreateMateriaRequest {
  nombre: string;
  descripcion: string;
  tipo: "anual" | "primer cuatrimestre" | "segundo cuatrimestre";
}

export interface UpdateMateriaRequest {
  nombre?: string;
  descripcion?: string;
  tipo?: "anual" | "primer cuatrimestre" | "segundo cuatrimestre";
}

export interface MateriaResponse {
  materia: Materia;
  message: string;
}

export interface MateriasListResponse {
  materias: Materia[];
  total: number;
}