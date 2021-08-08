import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
  ): Promise<{ token: string }> {
    return this.authService.signIn(authCredentialsDTO);
  }

  @Get('/test-token')
  @UseGuards(AuthGuard())
  async testToken(@Body() authCredentialsDTO: AuthCredentialsDTO) {}
}
