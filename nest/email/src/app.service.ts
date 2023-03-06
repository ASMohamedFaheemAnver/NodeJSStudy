import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  mail(): boolean {
    return true;
  }
}
