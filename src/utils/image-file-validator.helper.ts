import { FileValidator } from '@nestjs/common';

export class ImageMimeTypeValidator extends FileValidator {
  constructor() {
    super({});
  }

  isValid(file: Express.Multer.File): boolean {
    return (
      !!file &&
      typeof file.mimetype === 'string' &&
      file.mimetype.startsWith('image/')
    );
  }

  buildErrorMessage(): string {
    return 'Only image files are allowed';
  }
}
