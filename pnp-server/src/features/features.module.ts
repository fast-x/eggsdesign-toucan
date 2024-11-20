import { Module } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { FeaturesController } from './features.controller';
import { SanityService } from '../sanity/sanity.service';

@Module({
  controllers: [FeaturesController],
  providers: [FeaturesService, SanityService],
})
export class FeaturesModule {}
