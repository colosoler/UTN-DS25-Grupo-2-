import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

interface CaptchaRequest extends Request {
  body: {
    captchaToken?: string;
    [key: string]: any;
  };
}

export async function validateRecaptcha(
  req: CaptchaRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const captchaToken = req.body.captchaToken;

    if (!captchaToken) {
      return res.status(400).json({
        success: false,
        message: 'El token del CAPTCHA es requerido',
      });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      throw new Error('RECAPTCHA_SECRET_KEY no está configurada en las variables de entorno');
    }

    // Verificar el token contra Google reCAPTCHA
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      {},
      {
        params: {
          secret: secretKey,
          response: captchaToken,
        },
      }
    );

    const { success, error_codes } = response.data;

    if (!success) {
      return res.status(400).json({
        success: false,
        message: 'Validación del CAPTCHA fallida',
        errors: error_codes,
      });
    }

    
    next();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error validando CAPTCHA';
    return res.status(500).json({
      success: false,
      message,
    });
  }
}
