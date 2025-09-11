import { z } from 'zod';
export const createUserSchema = z.object({
name: z.string()
.min(1, 'El nombre es requerido')
.max(50, 'El nombre no puede exceder 50 caracteres')
.trim(),
surname: z.string()
.min(1, 'El apellido es requerido')
.max(50, 'El apellido no puede exceder 50 caracteres')
.trim(),
email: z.email()
.toLowerCase()
.trim(),
careerId: z.number(),
password: z.string()
.min(8, 'Mínimo 8 caracteres')
.regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
.regex(/[0-9]/, 'Debe contener al menos un número')
.trim(),
username: z.string()
.min(3, 'El nombre de usuario es requerido')
.max(50, 'El nombre de usuario no puede exceder 50 caracteres')
.trim(),
});
export const updateUserSchema = createUserSchema.partial();