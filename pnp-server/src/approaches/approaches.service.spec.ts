import { Test, TestingModule } from '@nestjs/testing';
import { ApproachesService } from './approaches.service';
import { SanityService } from '../sanity/sanity.service';
import { ConfigService } from '@nestjs/config';
import MockConfigService from '../../test/MockConfigService';

describe('ApproachesService', () => {
  let service: ApproachesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApproachesService,
        SanityService,
        { provide: ConfigService, useClass: MockConfigService },
      ],
    }).compile();

    service = module.get<ApproachesService>(ApproachesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
