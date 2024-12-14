import { Controller, Get, Param, Query } from '@nestjs/common';
import { SanityService } from './sanity.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('sanity')
@ApiTags('Sanity')
@ApiBearerAuth()
export class SanityController {
  constructor(private readonly sanityService: SanityService) {}

  @Get(':projectId/:dataset')
  @ApiQuery({ name: 'params', required: false })
  get(
    @Param('projectId') projectId: string,
    @Param('dataset') dataset: string,
    @Query('query') query: string,
    @Query('params') params?: string,
  ) {
    return this.sanityService.get(projectId, dataset, query, params);
  }
}
