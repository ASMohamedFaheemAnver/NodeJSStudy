import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials-dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDTO: AuthCredentialsDTO): Promise<User> {
    const { user_name, password } = authCredentialsDTO;
    const user = this.create({ user_name, password });
    try {
      await this.save(user);
      return user;
    } catch (e) {
      if (e.code == '23505') {
        throw new ConflictException('User name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
