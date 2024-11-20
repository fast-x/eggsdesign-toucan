import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssetsService } from './assets.service';

@Controller('assets')
@ApiTags('Assets')
@ApiBearerAuth()
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({
    status: 201,
    description: 'Upload an asset (image) to Sanity',
  })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.assetsService.upload(file);
  }
}
