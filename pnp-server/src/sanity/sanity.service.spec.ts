import { Test, TestingModule } from '@nestjs/testing';
import { SanityService } from './sanity.service';
import { ConfigService } from '@nestjs/config';
import MockConfigService from '../../test/MockConfigService';

describe('SanityService', () => {
  let service: SanityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SanityService,
        { provide: ConfigService, useClass: MockConfigService },
      ],
    }).compile();

    service = module.get<SanityService>(SanityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
