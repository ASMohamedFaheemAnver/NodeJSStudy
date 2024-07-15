import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Message } from './constants/graphql-types/message';
import { CreateUserDto } from './dtos/create-user-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  root(): Message {
    return {
      message: `server is up and running in ${process.env.NODE_ENV} mode`,
    };
  }

  @Post('create-user')
  createUser(@Body() createUserDto: CreateUserDto): Message {
    return { message: 'User created' };
  }
}
