import { Controller, Get, Param } from '@nestjs/common';
import { ApproachesService } from './approaches.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('approaches')
@ApiTags('Approaches')
@ApiBearerAuth()
export class ApproachesController {
  constructor(private readonly approachesService: ApproachesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'A list of all our approaches',
  })
  findAll() {
    return this.approachesService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'A single approach, found by ID',
  })
  findOne(@Param('id') id: string) {
    return this.approachesService.findOne(id);
  }
}
