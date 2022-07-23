import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

// By default PowerModule is injectable(Maybe?)
@Module({
  providers: [PowerService],
  // PowerService can be accessed by other modules after exporting it
  exports: [PowerService],
})
export class PowerModule {}
