import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function extractBearerToken(authHeader?: string): string | null {
   if (!authHeader) return null;
   if (!authHeader.toLowerCase().startsWith('bearer ')) return null;

   // Some clients may accidentally send duplicated prefix or quoted values.
   let token = authHeader.slice(7).trim();
   if (token.toLowerCase().startsWith('bearer ')) {
       token = token.slice(7).trim();
   }
   token = token.replace(/^['\"]|['\"]$/g, '');

   if (!token || token === 'null' || token === 'undefined') {
       return null;
   }
   return token;
}

function looksLikeJwt(token: string): boolean {
   return /^([A-Za-z0-9-_]+)\.([A-Za-z0-9-_]+)\.([A-Za-z0-9-_]+)$/.test(token);
}

declare global {
   namespace Express {
       interface Request {
           user?: {
               id: number;
               email: string;
               role: 'USER' | 'ADMIN';
           }
       }
   }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
   try {
       const token = extractBearerToken(req.headers.authorization);
       if (!token) {
           return res.status(401).json({ success: false, error: 'No se ha proporcionado un token de autenticación' });
       }

       if (!looksLikeJwt(token)) {
           return res.status(401).json({ success: false, error: 'El token de autenticación no es válido' });
       }

       const decoded = jwt.verify( token, process.env.JWT_SECRET!) as any;
       req.user = {
           id: decoded.id,
           email: decoded.email,
           role: decoded.role
       };
       next();
   } catch (error: any) {
       if (error.name === 'TokenExpiredError') {
           return res.status(401).json({ success:  false, error: 'El token de autenticación ha expirado'  });
       }
       if (error.name === 'JsonWebTokenError') {
           return res.status(401).json({ success: false, error: 'El token de autenticación no es válido' });
       }

       console.error(error);
       res.status(401).json({ success: false, error: 'El token de autenticación no es válido' });
   }
}

export function authorize(...roles: string[]) {
   return (req: Request, res: Response, next: NextFunction) => {
       if (!req.user) {
           return res.status(401).json({
               success: false,
               error: 'La solicitud requiere autenticación'
           });
       }
       if (!roles.includes(req.user.role)) {
           return res.status(403).json({
               success: false,
               error: 'No cuenta con los permisos necesarios para realizar esta acción'
           });
       }
       next();
   };
}
