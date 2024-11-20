import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { SanityDocumentStub } from '@sanity/client';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('documents')
@ApiTags('Documents')
@ApiBearerAuth()
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @ApiBody({
    type: 'application/json',
  })
  @ApiResponse({
    status: 201,
    description: 'Create a new document of any given type',
  })
  create(@Body() document: SanityDocumentStub<any>) {
    return this.documentsService.create(document);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'A single document, found by ID',
  })
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({
    type: 'application/json',
  })
  @ApiResponse({
    status: 200,
    description: 'Update a document, found by ID',
  })
  update(@Param('id') id: string, @Body() document: SanityDocumentStub<any>) {
    return this.documentsService.update(id, document);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete a document, found by ID',
  })
  remove(@Param('id') id: string) {
    return this.documentsService.remove(id);
  }
}
