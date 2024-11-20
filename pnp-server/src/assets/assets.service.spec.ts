import { Test, TestingModule } from '@nestjs/testing';
import { AssetsService } from './assets.service';
import { SanityService } from '../sanity/sanity.service';
import { ConfigService } from '@nestjs/config';
import MockConfigService from '../../test/MockConfigService';

describe('AssetsService', () => {
  let service: AssetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetsService,
        SanityService,
        { provide: ConfigService, useClass: MockConfigService },
      ],
    }).compile();

    service = module.get<AssetsService>(AssetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
