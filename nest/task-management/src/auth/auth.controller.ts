import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials-dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDTO: AuthCredentialsDTO): Promise<User> {
    return this.authService.signUp(authCredentialsDTO);
  }
  @Post('/signin')
  async signIn(
    @Body() authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<string> {
    return this.authService.signIn(authCredentialsDTO);
  }
}
