import { Module } from '@nestjs/common';
import { PowerModule } from 'src/power/power.module';
import { CpuService } from './cpu.service';

@Module({
  // Disk modules can use PowerModule exports
  imports: [PowerModule],
  providers: [CpuService],
  // Make CpuService available to computer module
  exports: [CpuService],
})
export class CpuModule {}
