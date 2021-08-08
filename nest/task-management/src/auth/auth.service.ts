import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials-dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<User> {
    return this.usersRepository.createUser(authCredentialsDTO);
  }

  async signIn(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ token: string }> {
    const { user_name, password } = authCredentialsDTO;
    const user = await this.usersRepository.findOne({ user_name });
    if (user && (await bcrypt.compare(user.password, password))) {
      const payload = { user_id: user.id };
      const token = await this.jwtService.sign(payload);
      return { token };
    }

    throw new UnauthorizedException('please check your credentials');
  }
}
