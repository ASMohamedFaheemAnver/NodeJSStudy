import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials-dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { user_name, password } = authCredentialsDTO;
    const user = this.create({ user_name, password });
    await this.save(user);
  }
}
