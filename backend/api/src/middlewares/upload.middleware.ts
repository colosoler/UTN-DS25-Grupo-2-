import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from '../config/cloudinary';
import { CloudinaryParams } from '../types/upload.types';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'user_profiles',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 400, height: 400, crop: 'fill' }],
  } as CloudinaryParams,
});

export const upload = multer({ storage });

const fileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'user_files',
    allowed_formats: ['pdf'],
    resource_type: 'raw',
    type: 'upload', 
  } as CloudinaryParams,
});

export const fileUpload = multer({ storage: fileStorage });

