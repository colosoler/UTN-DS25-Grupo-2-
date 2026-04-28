import { TipoMaterial } from "@prisma/client";

export interface Material {
    id: number;
    añoCursada: number | null;
    archivo: string; 
    cantidadReportes: number;
    comision: string | null;
    descripcion: string | null;
    fecha: Date;
    numeroParcial: number | null;
    titulo: string;
    materiaId: number;
    carreraId: number | null;
    tipo: TipoMaterial;
    userId: number;
    upvotes: number;
    downvotes: number;
}

export interface MaterialWithUser extends Material { //interfaz para devolver el material junto con el nombre de usuario y nombre de carrera 
	username: string;
    carreraNombre?: string | null;
}

// id, cantidadReportes, fecha no son necesarios.
export interface CreateMaterialRequest {
    añoCursada?: number | null;
    archivo: string;
    comision?: string | null;
    descripcion?: string | null;
    numeroParcial?: number | null;
    titulo: string;
    materiaId: number;
    carreraId?: number | null;
    tipo: TipoMaterial;
    userId: number;
}

export interface UpdateMaterialRequest {
    añoCursada?: number;
    archivo?: string;
    comision?: string;
    descripcion?: string;
    numeroParcial?: number | null;
    titulo?: string;
    materiaId?: number;
    carreraId?: number;
    tipo?: TipoMaterial;
    userId?: number;
    upvotes?: number;
    downvotes?: number;
}

export interface MaterialResponse {
    material: Material;
    message: string;
}

export interface MaterialsListResponse {
    materials: Material[];
    total: number;
    message?: string;
}