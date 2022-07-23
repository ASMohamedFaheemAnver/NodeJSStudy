import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
  supplyPower(watts: number, caller: string) {
    console.log({ message: 'supplying watts', watts, caller });
  }
}
