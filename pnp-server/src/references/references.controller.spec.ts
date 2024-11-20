import { Test, TestingModule } from '@nestjs/testing';
import { ReferencesController } from './references.controller';
import { ReferencesService } from './references.service';
import { SanityService } from '../sanity/sanity.service';
import { ConfigService } from '@nestjs/config';
import MockConfigService from '../../test/MockConfigService';

describe('ReferencesController', () => {
  let controller: ReferencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReferencesController],
      providers: [
        ReferencesService,
        SanityService,
        { provide: ConfigService, useClass: MockConfigService },
      ],
    }).compile();

    controller = module.get<ReferencesController>(ReferencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
