import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
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

  async getEstimate(getEstimateDto: GetEstimateDto) {
    // AVG(price) will make whole output as one raw
    const response = await this.repository
      .createQueryBuilder()
      .select(['AVG(price) as price'])
      .where('make = :make and model = :model', {
        make: getEstimateDto.make,
        model: getEstimateDto.model,
      })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: getEstimateDto.lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: getEstimateDto.lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year: getEstimateDto.year })
      .andWhere('approved IS true')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage: getEstimateDto.mileage })
      .limit(3)
      .getRawOne();
    console.log({ response, getEstimateDto });
    return response;
  }
}
