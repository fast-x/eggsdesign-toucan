import { Controller, Get, Query } from '@nestjs/common';
import { ReferencesService } from './references.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('references')
@ApiTags('References')
@ApiBearerAuth()
export class ReferencesController {
  constructor(private readonly referencesService: ReferencesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'A list of references for given type',
  })
  findByType(@Query('type') type: string) {
    return this.referencesService.findByType(type);
  }
}
