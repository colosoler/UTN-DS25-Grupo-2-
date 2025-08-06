export interface Material {
    id: number;
    añoCursada: number;
    archivos: string[]; 
    cantidadReportes: number;
    comision: string;
    descripcion: string;
    fecha: Date;
    numeroParcial: number;
    titulo: string;
    materiaId: string;
    carreraId: string;
    tipo: string;
    userId: string;
}

// id, cantidadReportes, fecha no son necesarios.
export interface CreateMaterialRequest {
    añoCursada: number;
    archivos: string[];
    comision: string;
    descripcion: string;
    numeroParcial: number;
    titulo: string;
    materiaId: string;
    carreraId: string;
    tipo: string;
    userId: string;
}

export interface UpdateMaterialRequest {
    añoCursada?: number;
    archivos?: string[];
    comision?: string;
    descripcion?: string;
    numeroParcial?: number;
    titulo?: string;
    materiaId?: string;
    carreraId?: string;
    tipo?: string;
    userId?: string;
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