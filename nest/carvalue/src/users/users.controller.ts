import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { DeleteResult } from 'typeorm';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/me')
  async me(@Session() session: any): Promise<User> {
    return this.usersService.findOne(session.userId);
  }

  @Post('/signup')
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Session() session: any,
  ): Promise<User> {
    console.log({ createUserDto });
    const user = await this.authService.signup(
      createUserDto.email,
      createUserDto.password,
    );
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(
    @Body() createUserDto: CreateUserDto,
    @Session() session: any,
  ): Promise<User> {
    console.log({ createUserDto });
    const user = await this.authService.signin(
      createUserDto.email,
      createUserDto.password,
    );
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    delete session.userId;
    return { message: 'signout successfully' };
  }

  // Nest recommended approach to remove password from response
  // @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  findUser(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get('/')
  findUsers(@Query('email') email: string): Promise<User[]> {
    // console.log({ message: `inside ${this.findUser.name}` });
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string): Promise<DeleteResult> {
    return this.usersService.remove(id);
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<DeleteResult> {
    return this.usersService.update(id, updateUserDto);
  }
}
