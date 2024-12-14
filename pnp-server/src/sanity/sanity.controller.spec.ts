import { Test, TestingModule } from '@nestjs/testing';
import { SanityController } from './sanity.controller';
import { SanityService } from './sanity.service';
import { ConfigService } from '@nestjs/config';
import MockConfigService from '../../test/MockConfigService';

describe('SanityController', () => {
  let controller: SanityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SanityController],
      providers: [
        SanityService,
        { provide: ConfigService, useClass: MockConfigService },
      ],
    }).compile();

    controller = module.get<SanityController>(SanityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
