import { Injectable } from '@nestjs/common';
import { SanityService } from '../sanity/sanity.service';

@Injectable()
export class FeaturesService {
  constructor(private readonly sanityService: SanityService) {}

  findAll() {
    return this.sanityService.client.fetch(
      '*[_type == "dashboardConfiguration"][0]{...}',
    );
  }
}
