import { Controller, Get } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('features')
@ApiTags('Features')
@ApiBearerAuth()
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'A list of all features',
  })
  findAll() {
    return this.featuresService.findAll();
  }
}
