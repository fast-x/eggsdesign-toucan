import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { SanityService } from '../sanity/sanity.service';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService, SanityService],
})
export class DocumentsModule {}
