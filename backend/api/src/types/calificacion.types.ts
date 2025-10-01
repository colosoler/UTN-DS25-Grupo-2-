export interface Calificacion {
	id: number;
	userId: number;
	materialId: number;
	value: boolean;
	createdAt: Date;
}

export interface CreateCalificacionRequest {
	userId: number;
	materialId: number;
	value: boolean;
}

export interface UpdateCalificacionRequest {
	userId?: number;
	materialId?: number;
	value?: boolean;
}

export interface CalificacionResponse {
	calificacion: Calificacion;
	message: string;
}

export interface CalificacionesListResponse {
	calificaciones: Calificacion[];
	total: number;
	message?: string;
}