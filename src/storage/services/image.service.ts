import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
import { S3Service } from './s3.service';
import { randomUUID } from 'crypto';

@Injectable()
export class ImageService {
  constructor(private readonly s3Service: S3Service) {}

  async uploadAvatar(
    file: Express.Multer.File,
    oldKey?: string,
  ): Promise<string> {
    if (oldKey) {
      await this.s3Service.delete(oldKey);
    }

    const buffer = await sharp(file.buffer)
      .resize(256, 256, { fit: 'cover' })
      .webp({ quality: 80 })
      .toBuffer();

    const key = `avatars/${randomUUID()}.webp`;
    const url = await this.s3Service.upload({
      key,
      buffer,
      contentType: 'image/webp',
    });

    return url;
  }
}
