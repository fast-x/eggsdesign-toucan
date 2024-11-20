import { Test, TestingModule } from '@nestjs/testing';
import { ApproachesController } from './approaches.controller';
import { ApproachesService } from './approaches.service';
import { SanityService } from '../sanity/sanity.service';
import { ConfigService } from '@nestjs/config';
import MockConfigService from '../../test/MockConfigService';

describe('ApproachesController', () => {
  let controller: ApproachesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApproachesController],
      providers: [
        ApproachesService,
        SanityService,
        { provide: ConfigService, useClass: MockConfigService },
      ],
    }).compile();

    controller = module.get<ApproachesController>(ApproachesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
