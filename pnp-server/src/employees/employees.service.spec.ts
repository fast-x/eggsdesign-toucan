import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { SanityService } from '../sanity/sanity.service';
import { ConfigService } from '@nestjs/config';
import MockConfigService from '../../test/MockConfigService';

describe('EmployeesService', () => {
  let service: EmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        SanityService,
        { provide: ConfigService, useClass: MockConfigService },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
