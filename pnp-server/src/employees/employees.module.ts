import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { SanityService } from '../sanity/sanity.service';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, SanityService],
})
export class EmployeesModule {}
