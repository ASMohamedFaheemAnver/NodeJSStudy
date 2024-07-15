import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Message } from './constants/graphql-types/message';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  root(): Message {
    return {
      message: `server is up and running in ${process.env.NODE_ENV} mode`,
    };
  }
}
