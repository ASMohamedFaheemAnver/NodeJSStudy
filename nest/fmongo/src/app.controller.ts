import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    appService.populateMulti();
  }

  @Get()
  root(): { message: string } {
    return { message: 'server is up and running' };
  }

  @Get('/create')
  create(): { message: string } {
    this.appService.create();
    return { message: 'done!' };
  }

  @Get('/session')
  session(): { message: string } {
    this.appService.session();
    return { message: 'done!' };
  }
}
