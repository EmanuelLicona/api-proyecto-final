import { Module } from '@nestjs/common';
import { S3Service } from './services/s3.service';
import { ImageService } from './services/image.service';

@Module({
  providers: [S3Service, ImageService],
  exports: [ImageService],
})
export class StorageModule {}
