import { Test, TestingModule } from '@nestjs/testing';
import { ReferencesService } from './references.service';
import { SanityService } from '../sanity/sanity.service';
import { ConfigService } from '@nestjs/config';
import MockConfigService from '../../test/MockConfigService';

describe('ReferencesService', () => {
  let service: ReferencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReferencesService,
        SanityService,
        { provide: ConfigService, useClass: MockConfigService },
      ],
    }).compile();

    service = module.get<ReferencesService>(ReferencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
