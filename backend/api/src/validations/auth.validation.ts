import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    captchaToken: z.string().min(1, 'El token del CAPTCHA es requerido')
});

export const googleLoginSchema = z.object({
    credential: z.string().min(1, 'La credencial de Google es requerida')
});
