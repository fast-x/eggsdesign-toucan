import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { Public } from '../auth/azure-auth.guard';

@Controller('events')
@ApiTags('Events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Public()
  @Get(':groupId')
  findAllInGroup(@Param('groupId') groupId: string) {
    return this.eventsService.findEventsByGroupId(groupId);
  }

  @Public()
  @Get('/kiosk/:office')
  findAllKioskURLs(@Param('office') office: string) {
    return this.eventsService.findAllKioskURLs(office);
  }
}
