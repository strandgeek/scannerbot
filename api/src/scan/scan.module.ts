import { Module } from '@nestjs/common';
import { ScanController } from './scan.controller';
import { ScanService } from './scan.service';
import { ProjectsModule } from 'src/projects/projects.module';
import { PrismaService } from 'src/prisma.service';
import { ScannerService } from 'src/scanner/scanner.service';

@Module({
  controllers: [ScanController],
  providers: [PrismaService, ScanService, ScannerService],
  imports: [ProjectsModule],
})
export class ScanModule { }
