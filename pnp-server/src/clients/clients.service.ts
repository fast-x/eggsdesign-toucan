import { Injectable } from '@nestjs/common';
import { SanityService } from '../sanity/sanity.service';

@Injectable()
export class ClientsService {
  constructor(private readonly sanityService: SanityService) {}

  findAll(query?: string) {
    const q = query ? `*${query}*` : '*';
    return this.sanityService.client.fetch(
      '*[_type == "client" && !(_id in path("drafts.**")) && name match $q] | order(name asc){_id, name, clientDJ->{_id, firstName}}',
      { q },
    );
  }

  findOne(id: string) {
    return this.sanityService.client.fetch(
      '*[_type == "client" && _id == $id][0]',
      { id },
    );
  }
}
