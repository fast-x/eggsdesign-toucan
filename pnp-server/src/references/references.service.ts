import { Injectable } from '@nestjs/common';
import { SanityService } from '../sanity/sanity.service';

@Injectable()
export class ReferencesService {
  constructor(private readonly sanityService: SanityService) {}

  findByType(type: string) {
    return this.sanityService.client.fetch(
      `*[!(_id in path("drafts.**")) && _type == $type]{
                _type,
                _id,
                name,
                firstName,
                lastName,
                image {
                  "url": asset->url
                }
              }`,
      { type },
    );
  }
}
