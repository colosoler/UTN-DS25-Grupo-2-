import { Request, Response, NextFunction } from 'express';
import { PDFDocument } from 'pdf-lib';

export const mergeFiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const files = req.files as Express.Multer.File[] | undefined;

        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'No se enviaron archivos' });
        }

        // Si solo hay un archivo, no hace falta mergear
        if (files.length === 1) {
            req.file = files[0];
            return next();
        }

        // Crear un nuevo PDF donde se van a unir todas las páginas
        const mergedPdf = await PDFDocument.create();

        for (const file of files) {
            if (file.mimetype !== 'application/pdf') {
                return res.status(400).json({
                    message: `El archivo "${file.originalname}" no es un PDF válido`,
                });
            }

            const pdf = await PDFDocument.load(file.buffer);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        const mergedPdfBytes = await mergedPdf.save();
        const mergedBuffer = Buffer.from(mergedPdfBytes);

        // Construir un objeto compatible con Multer.File para req.file
        req.file = {
            fieldname: files[0].fieldname,
            originalname: 'merged.pdf',
            encoding: '7bit',
            mimetype: 'application/pdf',
            buffer: mergedBuffer,
            size: mergedBuffer.length,
        } as Express.Multer.File;

        next();
    } catch (error) {
        next(error);
    }
};