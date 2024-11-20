import { Injectable } from '@nestjs/common';
import { SanityService } from '../sanity/sanity.service';

@Injectable()
export class FiltersService {
  constructor(private readonly sanityService: SanityService) {}

  findAll() {
    return this.sanityService.client.fetch(`{
        'clients': *[!(_id in path("drafts.**")) && _type == "client"]{ name, "value": _id },
        'domains': *[!(_id in path("drafts.**")) && _type == "domain"]{ name, "value": _id },
        'competences': *[!(_id in path("drafts.**")) && _type == "competence"]{ name, "value": _id },
        'levels': *[!(_id in path("drafts.**")) && _type == "level"]{ name, "value": _id },
        'bases': *[!(_id in path("drafts.**")) && _type == "base"]{ name, "value": _id },
        'approaches': *[!(_id in path("drafts.**")) && _type == "approach"]{ name, "value": _id },
        'skills': *[!(_id in path("drafts.**")) && _type == "skill"]{ name, "value": _id },
        'offices': *[!(_id in path("drafts.**")) && _type == "office"]{ name, "value": _id },
        'employees': *[!(_id in path("drafts.**")) && _type == "employee"]{
          ...,
          _id,
          image {
            "url": asset->url
          },
          "imageURL": image.asset->url,
          level->,
          competences[]->{name},
          office->{city}
        },
      }`);
  }
}
