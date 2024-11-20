import { Controller, Get, Param } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('employees')
@ApiTags('Employees')
@ApiBearerAuth()
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'A list of all employees',
  })
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'A single employee, found by ID',
  })
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }
}
