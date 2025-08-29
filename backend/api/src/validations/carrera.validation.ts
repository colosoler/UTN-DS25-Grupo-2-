import { z } from 'zod';

const createCarreraMateriaSchema = z.object({
    materiaId: z.number('El ID de la materia debe ser un numero')
        .positive('El ID de la materia debe ser un numero positivo'),
    anio: z.number()
        .min(1, 'El año debe ser al menos 1')   
        .max(7, 'El año no puede ser mayor a 7'),
});

export const createCarreraSchema = z.object({
    nombre: z.string()
        .min(1, 'El nombre es un campo requerido')
        .max(100, 'El nombre no puede exceder los 100 caracteres')
        .trim(),
    materias: z.array(createCarreraMateriaSchema).optional()
});
