import { Controller, Body, Query, Post } from '@nestjs/common';

import { ReportsService } from './reports.service';
import { UserStatsFilterDto } from 'src/common/dtos/user-stats-filter.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

//@Auth(ValidRoles.admin)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('user-evaluations')
  async getUserEvaluations(
    @Query() paginationDto: PaginationDto,
    @Body() filters: UserStatsFilterDto
  ) {
    return this.reportsService.getUserEvaluations(filters, paginationDto);
  }
}
