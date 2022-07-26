import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private repository: Repository<Report>,
  ) {}

  create(createReportDto: CreateReportDto, user: User) {
    const report = this.repository.create({ ...createReportDto, user });
    return this.repository.save(report);
  }

  async updateApproval(id: string, approved: boolean) {
    const response = await this.repository.update({ id }, { approved });
    if (!response.affected) {
      throw new NotFoundException('record not found');
    }
    return response;
  }
}
