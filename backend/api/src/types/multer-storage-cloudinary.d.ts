declare module 'multer-storage-cloudinary' {
  import { StorageEngine } from 'multer';

  interface CloudinaryStorageOptions {
    cloudinary: any;
    params?: any;
  }

  class CloudinaryStorage implements StorageEngine {
    constructor(opts: CloudinaryStorageOptions);
    _handleFile(req: any, file: any, cb: any): void;
    _removeFile(req: any, file: any, cb: any): void;
  }

  export default CloudinaryStorage;
}
