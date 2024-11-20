import { Injectable } from '@nestjs/common';
import { SanityService } from '../sanity/sanity.service';

@Injectable()
export class ApproachesService {
  constructor(private readonly sanityService: SanityService) {}

  findAll() {
    return this.sanityService.client.fetch(
      `*[_type == "approach" && !(_id in path("drafts.**"))] | order(name.en asc) {
                _id,
                name,
                competence[]->{...},
                images[] { 
                  "url": asset->url,
                  "color": asset->metadata.palette.darkVibrant
                }
              }`,
    );
  }

  findOne(id: string) {
    return this.sanityService.client.fetch(
      `*[_type == "approach" && _id == $id][0] {
      ...,
      images[]{..., "url": asset->url,},
      competence[]->{...},
      gotoPerson->{...,_id, image {
        "url": asset->url
      },}
    }`,
      { id },
    );
  }
}
