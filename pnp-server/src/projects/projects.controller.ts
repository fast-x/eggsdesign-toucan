import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SanityDocumentStub } from '@sanity/client';

@Controller('projects')
@ApiTags('Projects')
@ApiBearerAuth()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'A list of all projects',
  })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'A single project, found by ID',
  })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({
    type: 'application/json',
  })
  @ApiResponse({
    status: 200,
    description: 'Update a project, found by ID',
  })
  update(@Param('id') id: string, @Body() project: SanityDocumentStub<any>) {
    return this.projectsService.update(id, project);
  }
}
