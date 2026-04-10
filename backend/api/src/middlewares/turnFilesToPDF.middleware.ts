import { Request, Response, NextFunction } from 'express';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';

export const turnFilesToPDF = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const files = req.files as Express.Multer.File[] | undefined;

        if (!files || files.length === 0) {
            return next();
        }

        const processedFiles: Express.Multer.File[] = [];
        let hasChanges = false;

        for (const file of files) {
            if (file.mimetype.startsWith('image/')) {
                hasChanges = true;

                // Usamos sharp para procesar la imagen:
                // 1. rotate(): sin argumentos, auto-rota la imagen según su metadata EXIF de orientación.
                // 2. jpeg(): convierte de forma segura a JPEG para que pdf-lib nunca falle por formatos.
                const processedImageBuffer = await sharp(file.buffer)
                    .rotate()
                    .jpeg()
                    .toBuffer();

                const pdfDoc = await PDFDocument.create();

                const image = await pdfDoc.embedJpg(processedImageBuffer);

                const page = pdfDoc.addPage([image.width, image.height]);
                page.drawImage(image, {
                    x: 0,
                    y: 0,
                    width: image.width,
                    height: image.height,
                });

                const pdfBytes = await pdfDoc.save();
                const buffer = Buffer.from(pdfBytes);

                const fileNameWithoutExt = file.originalname.substring(0, file.originalname.lastIndexOf('.')) || file.originalname;
                const newOriginalName = `${fileNameWithoutExt}.pdf`;

                processedFiles.push({
                    ...file,
                    originalname: newOriginalName,
                    mimetype: 'application/pdf',
                    buffer: buffer,
                    size: buffer.length
                });
            } else {
                processedFiles.push(file);
            }
        }

        if (hasChanges) {
            req.files = processedFiles;
        }

        next();
    } catch (error) {
        next(error);
    }
};
