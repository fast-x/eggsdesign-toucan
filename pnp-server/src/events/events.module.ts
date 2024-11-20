import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { HttpModule } from '@nestjs/axios';
import { SanityService } from '../sanity/sanity.service';

@Module({
  imports: [HttpModule],
  controllers: [EventsController],
  providers: [EventsService, SanityService],
})
export class EventsModule {}
