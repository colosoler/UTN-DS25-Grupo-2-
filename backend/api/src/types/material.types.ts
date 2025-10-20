import { TipoMaterial } from "@prisma/client";

export interface Material {
    id: number;
    añoCursada: number;
    archivo: string; 
    cantidadReportes: number;
    comision: string;
    descripcion: string;
    fecha: Date;
    numeroParcial: number;
    titulo: string;
    materiaId: number;
    carreraId: number;
    tipo: TipoMaterial;
    userId: number;
    upvotes: number;
    downvotes: number;
}

export interface MaterialWithUser extends Material { //interfaz para devolver el material junto con el nombre de usuario
	username: string;
}

// id, cantidadReportes, fecha no son necesarios.
export interface CreateMaterialRequest {
    añoCursada: number;
    archivo: string;
    comision: string;
    descripcion: string;
    numeroParcial: number;
    titulo: string;
    materiaId: number;
    carreraId: number;
    tipo: TipoMaterial;
    userId: number;
}

export interface UpdateMaterialRequest {
    añoCursada?: number;
    archivo?: string;
    comision?: string;
    descripcion?: string;
    numeroParcial?: number;
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