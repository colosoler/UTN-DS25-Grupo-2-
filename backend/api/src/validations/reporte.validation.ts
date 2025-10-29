import { z } from 'zod';

export const createReporteSchema = z.object({
    userId: z.number()
        .int('El ID del usuario debe ser un número entero')
        .positive('El ID del usuario debe ser un número positivo'),
        
    materialId: z.number()
        .int('El ID del material debe ser un número entero')
        .positive('El ID del material debe ser un número positivo'),
});

export const updateReporteSchema = createReporteSchema
    .partial()
    .omit({
        userId: true,
        materialId: true,
    });