import { z } from 'zod';

export const createMateriaSchema = z.object({
  nombre: z.string()
    .min(1, 'El nombre es requerido')
    .max(75, 'El nombre debe tener menos de 75 caracteres'),

  descripcion: z.string()
    .min(1, 'La descripción es requerida')
    .max(300, 'La descripción debe tener menos de 300 caracteres')
});

// El Schema para actualizar tiene las mismas validaciones que el schema para crear pero con todos sus campos opcionales
export const updateMateriaSchema = createMateriaSchema.partial();