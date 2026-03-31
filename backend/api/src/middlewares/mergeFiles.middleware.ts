import { Request, Response, NextFunction } from 'express';

export const mergeFiles = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No se enviaron archivos' });
        }
        const firstFile = (req as any).files[0];
        req.file = firstFile;
        next();
    } catch (error) {
        next(error);
    }
};