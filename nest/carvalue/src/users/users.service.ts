import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repository.create({ email, password });
    return this.repository.save(user);
  }

  async findOne(id: string) {
    const user = await this.repository.findOne({ where: { id: id ?? '' } });
    if (!user) {
      // HTTP protocol only understand these error
      // Own exception filter will help reusing this service inside WebSockets and GRPC
      throw new NotFoundException('user not found');
    }
    return user;
  }

  find(email: string) {
    return this.repository.find({ where: { email } });
  }

  async update(id: string, attrs: Partial<User>) {
    // const user = await this.findOne(id);
    // if (!user) {
    //   throw new NotFoundException('user not found');
    // }
    // Object.assign(user, attrs);
    // this.repository.save(user);
    return this.repository.update({ id }, attrs);
  }

  async remove(id: string) {
    // const user = await this.findOne(id);
    // if (!user) {
    //   throw new NotFoundException('user not found');
    // }
    // this.repository.remove(user);
    return this.repository.delete({ id });
  }
}
