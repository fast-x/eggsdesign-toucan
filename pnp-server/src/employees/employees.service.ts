import { Injectable } from '@nestjs/common';
import { SanityService } from '../sanity/sanity.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly sanityService: SanityService) {}

  findAll() {
    return this.sanityService.client.fetch(
      `*[_type == "employee" && type == "employee" && !(_id in path("drafts.**"))] | order(firstName asc) {
                _id,
                _type,
                title,
                firstName,
                lastName,
                image {
                  "url": asset->url
                },
                level->{name},
                offices[]->{name},
                approaches[]->{name},
                competences[]->{name},
              }`,
    );
  }

  findOne(id: string) {
    return this.sanityService.client.fetch(
      `*[_type == "employee" && _id == $id][0]{
              ...,
              image {
                "url": asset->url
              },
              level->,
              roles,
              competences[]->{name},
              offices[]->{name},
              approaches[]->{name, _id},
              "projects": *[_type == "project" && references(^._id) && !(_id in path("drafts.**"))]{
                _id,
                ...,
                images[]{
                  asset->,
                  "color": asset->metadata.palette.darkMuted,
                  "url": asset->url
                },
                client->{name},
                title,
                approaches[]->,
                competences[]->,
                employees,
                "employeeDescription": employees[participant._ref match $id]{contribution}[0]
              }
            }`,
      { id },
    );
  }
}
