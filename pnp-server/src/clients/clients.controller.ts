import { Controller, Get, Param, Query } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('clients')
@ApiTags('Clients')
@ApiBearerAuth()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'A list of all clients',
  })
  findAll(@Query('query') query: string) {
    return this.clientsService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'A single client, found by ID',
  })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }
}
