import { Module } from '@nestjs/common';
import { ReferencesService } from './references.service';
import { ReferencesController } from './references.controller';
import { SanityService } from '../sanity/sanity.service';

@Module({
  controllers: [ReferencesController],
  providers: [ReferencesService, SanityService],
})
export class ReferencesModule {}
