import { Injectable } from '@nestjs/common';
import { SanityService } from '../sanity/sanity.service';

@Injectable()
export class AssetsService {
  constructor(private readonly sanityService: SanityService) {}

  upload(file: Express.Multer.File) {
    return this.sanityService.client.assets.upload('image', file.buffer, {
      filename: file.filename,
    });
  }
}
