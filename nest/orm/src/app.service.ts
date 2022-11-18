import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {
    // this.repository.save({ name: 'udev' });
  }
  async getUsers(): Promise<User[]> {
    return await this.repository.find({});
  }
}
