import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { SanityService } from '../sanity/sanity.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, SanityService],
})
export class ProjectsModule {}
