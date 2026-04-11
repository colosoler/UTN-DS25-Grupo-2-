import { MotivoPunto } from "@prisma/client";

export interface Punto {
	id: number;
	userId: number;
	value: number;
	createdAt: Date;
    motivo: MotivoPunto;
}

export interface CreatePuntoRequest {
	userId: number;
	motivo: MotivoPunto;
	value: number;
}

export interface UpdatePuntoRequest {
	userId?: number;
	motivo?: MotivoPunto;
	value?: number;
}

export interface PuntoResponse {
	punto: Punto | null;
	message: string;
}

export interface PuntosListResponse {
	puntos: Punto[];
	total: number;
	message?: string;
}