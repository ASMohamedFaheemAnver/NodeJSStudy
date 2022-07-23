import { Module } from '@nestjs/common';
import { PowerModule } from 'src/power/power.module';
import { DiskService } from './disk.service';

@Module({
  // Disk modules can use PowerModule exports
  imports: [PowerModule],
  providers: [DiskService],
  // Make DiskService available to computer module
  exports: [DiskService],
})
export class DiskModule {}
