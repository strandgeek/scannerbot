import { Module } from '@nestjs/common';
import { ScannerService } from './scanner.service';

@Module({
  providers: [ScannerService]
})
export class ScannerModule {}
