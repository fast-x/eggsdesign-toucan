import { Module } from '@nestjs/common';
import { ApproachesService } from './approaches.service';
import { ApproachesController } from './approaches.controller';
import { SanityService } from '../sanity/sanity.service';

@Module({
  controllers: [ApproachesController],
  providers: [ApproachesService, SanityService],
})
export class ApproachesModule {}
