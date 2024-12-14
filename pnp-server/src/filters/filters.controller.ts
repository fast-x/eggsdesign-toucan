import { Controller, Get } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('filters')
@ApiTags('Filters')
@ApiBearerAuth()
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'A list of all filters',
  })
  findAll() {
    return this.filtersService.findAll();
  }
}
