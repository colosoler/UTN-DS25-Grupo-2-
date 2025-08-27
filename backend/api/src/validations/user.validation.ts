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
email: z.email(),
password: z.string()
.min(8, 'La contraseña debe tener al menos 8 caracteres')
.max(100, 'La contraseña no puede exceder 100 caracteres')
.trim(),
username: z.string()
.min(3, 'El nombre de usuario es requerido')
.max(50, 'El nombre de usuario no puede exceder 50 caracteres')
.trim(),
});
export const updateUserSchema = createUserSchema.partial();