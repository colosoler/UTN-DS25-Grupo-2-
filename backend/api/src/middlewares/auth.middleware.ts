import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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
       const authHeader = req.headers.authorization;
       if (!authHeader || !authHeader.startsWith('Bearer ')) {
           return res.status(401).json({ success: false, error: 'No se ha proporcionado un token de autenticación' });
       }
       const token = authHeader.split(' ')[1];
       const decoded = jwt.verify( token, process.env.JWT_SECRET!) as any;
       req.user = {
           id: decoded.id,
           email: decoded.email,
           role: decoded.role
       };
       next();
   } catch (error: any) {
       console.error(error);
       if (error.name === 'TokenExpiredError') {
           return res.status(401).json({ success:  false, error: 'El token de autenticación ha expirado'  });
       }
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
