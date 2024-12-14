import { Injectable } from '@nestjs/common';
import { SanityService } from '../sanity/sanity.service';
import { SanityDocumentStub } from '@sanity/client';

@Injectable()
export class ProjectsService {
  constructor(private readonly sanityService: SanityService) {}

  findAll() {
    return this.sanityService.client.fetch(`
    *[
      _type == "project" &&
      !(_id in path("drafts.**")) &&
      !(defined(isNonCompanyProject) && isNonCompanyProject)
    ] | order(_updatedAt desc)
    {
      _id,
      _type,
      title,
      images[] {
        "color": asset->metadata.palette.darkMuted,
        "url": asset->url
      },
      visibility,
      approaches[]->{name},
      domains[]->{name},
      "clientId": client._ref,
      "client": client->name,
      competences[]->{name, _id}
    }`);
  }

  findOne(id: string) {
    return this.sanityService.client.fetch(
      `*[_type == "project" && _id == $id][0]{
                        ...,
                        _id,
                        images[] {
                          ...,
                          _id,
                          asset->,
                          "color": asset->metadata.palette.darkMuted,
                          "url": asset->url
                        },
                        projectManager->{
                          ...,
                          "imageURL": image.asset->url
                        },
                        employees[]{
                          ...,
                          participant->{
                            ...,
                            competences[]->{name},
                            level->{name},
                            roles->,
                            "imageURL": image.asset->url
                          }
                        },
                        approaches[]->,
                        domains[]->,
                        competence[]->{name},
                        "clientId": client._ref,
                        "client": client->name,
                        awards[]->{...,_id, image {
                          "url": asset->url
                        },}
                      }`,
      { id },
    );
  }

  update(id: string, project: SanityDocumentStub<any>) {
    return this.sanityService.client.patch(id).set(project).commit();
  }
}
