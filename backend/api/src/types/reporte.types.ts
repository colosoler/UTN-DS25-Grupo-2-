import { MotivoReporte } from "@prisma/client";

export interface Reporte {
    id: number;
    userId: number;
    materialId: number;
    descripcion?: string | null;
    motivo: MotivoReporte;
    createdAt: Date;
}

export interface CreateReporteRequest {
    userId: number;
    materialId: number;
    descripcion?: string | null;
    motivo: MotivoReporte;
}

export interface UpdateReporteRequest {
    userId?: number;
    materialId?: number;
    descripcion?: string | null;
    motivo?: MotivoReporte;
}

export interface ReporteResponse {
    reporte: Reporte | null;
    message: string;
}

export interface ReportesListResponse {
    reportes: Reporte[];
    total: number;
    message?: string;
}