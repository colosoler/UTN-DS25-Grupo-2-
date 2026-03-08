declare module 'multer-storage-cloudinary' {
  import { StorageEngine } from 'multer';

  interface CloudinaryStorageOptions {
    cloudinary: any;
    params?: any;
  }

  function CloudinaryStorage(opts: CloudinaryStorageOptions): StorageEngine;

  export default CloudinaryStorage;
}
