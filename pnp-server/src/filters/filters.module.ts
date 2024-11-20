import { Module } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { FiltersController } from './filters.controller';
import { SanityService } from '../sanity/sanity.service';

@Module({
  controllers: [FiltersController],
  providers: [FiltersService, SanityService],
})
export class FiltersModule {}
