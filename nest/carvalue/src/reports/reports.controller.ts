import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { ReportDto } from './dtos/report.dto';
import { Report } from './report.entity';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(
    @Body() createReportDto: CreateReportDto,
    @CurrentUser() user: User,
  ): Report | Promise<Report> {
    return this.reportsService.create(createReportDto, user);
  }

  @UseGuards(AdminGuard)
  @Patch('/:id')
  approveReport(
    @Param('id')
    id: string,
    @Body() approveReportDto: ApproveReportDto,
  ) {
    return this.reportsService.updateApproval(id, approveReportDto.approved);
  }

  @Get()
  getEstimate(@Query() getEstimateDto: GetEstimateDto) {
    // console.log({ getEstimateDto });
    return this.reportsService.getEstimate(getEstimateDto);
  }
}
