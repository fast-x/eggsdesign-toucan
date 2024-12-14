import { Injectable } from '@nestjs/common';
import { SanityService } from '../sanity/sanity.service';
import { SanityDocumentStub } from '@sanity/client';

@Injectable()
export class DocumentsService {
  constructor(private readonly sanityService: SanityService) {}

  create(document: SanityDocumentStub<any>) {
    return this.sanityService.client.create(document);
  }

  findOne(id: string) {
    return this.sanityService.client.getDocument(id);
  }

  update(id: string, document: SanityDocumentStub<any>) {
    return this.sanityService.client.patch(id).set(document).commit();
  }

  remove(id: string) {
    return this.sanityService.client.delete(id);
  }
}
