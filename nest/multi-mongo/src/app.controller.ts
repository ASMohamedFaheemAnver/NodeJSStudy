import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    appService.play();
  }

  @Get()
  root(): { message: string } {
    return { message: "server is up and running" };
  }
}
