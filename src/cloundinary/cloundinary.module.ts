import { Global, Module } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryService } from './cloundinary.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    CloudinaryService,
    {
      provide: 'CLOUDINARY',
      useFactory: () => {
        return cloudinary.config({
          cloud_name: process.env.CLOUD_NAME,
          api_key: process.env.CLOUD_API_KEY,
          api_secret: process.env.CLOUD_SECERT,
        });
      },
    },
  ],
  exports: [CloudinaryService],
})
export class CloundinaryModule {}
