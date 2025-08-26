import { z } from 'zod';
import { TipoMaterial } from '../generated/prisma';

export const createMaterialSchema = z.object({

	añoCursada: z.number()
		.int('El año de cursada debe ser un número entero')
		.positive('El año de cursada debe ser un número positivo')
		.max(new Date().getFullYear(), "El año de cursada no puede ser posterior al año actual"),
	archivo: z.string()
        .min(1, 'El archivo es un campo requerido'),
	comision: z.string()
        .min(1, 'La comisión es un campo requerido')
        .max(50, 'La comisión no puede exceder los 50 caracteres'),
	descripcion: z.string()
        .min(1, 'La descripción es un campo requerido'),
	numeroParcial: z.number()
		.int('El número de parcial debe ser un número entero')
		.positive('El número de parcial debe ser un número positivo')
		.optional(),
	titulo: z.string()
        .min(1, 'El título es un campo requerido')
        .max(200, 'El título no puede exceder los 200 caracteres')
        .trim(),
	tipo: z.nativeEnum(TipoMaterial),
	materiaId: z.number()
		.int('El ID de la materia debe ser un número entero')
		.positive('El ID de la materia debe ser un número positivo'),
	carreraId: z.number()
		.int('El ID de la carrera debe ser un número entero')
		.positive('El ID de la carrera debe ser un número positivo'),
	userId: z.number()
		.int('El ID del usuario debe ser un número entero')
		.positive('El ID del usuario debe ser un número positivo'),
});

export const updateMaterialSchema = createMaterialSchema.partial();