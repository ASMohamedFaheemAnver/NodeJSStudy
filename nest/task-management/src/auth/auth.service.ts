import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials-dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<User> {
    return this.usersRepository.createUser(authCredentialsDTO);
  }

  async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<string> {
    const { user_name, password } = authCredentialsDTO;
    const user = await this.usersRepository.findOne({ user_name });
    if (user && (await bcrypt.compare(user.password, password))) {
      return 'logged in';
    }

    throw new UnauthorizedException('please check your credentials');
  }
}
