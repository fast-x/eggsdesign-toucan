import { Test, TestingModule } from '@nestjs/testing';
import { FiltersController } from './filters.controller';
import { FiltersService } from './filters.service';
import { SanityService } from '../sanity/sanity.service';
import { ConfigService } from '@nestjs/config';
import MockConfigService from '../../test/MockConfigService';

describe('FiltersController', () => {
  let controller: FiltersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FiltersController],
      providers: [
        FiltersService,
        SanityService,
        { provide: ConfigService, useClass: MockConfigService },
      ],
    }).compile();

    controller = module.get<FiltersController>(FiltersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
