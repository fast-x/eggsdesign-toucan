import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { SanityService } from '../sanity/sanity.service';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, SanityService],
})
export class ClientsModule {}
