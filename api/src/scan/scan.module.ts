import { Module } from '@nestjs/common';
import { ScanController } from './scan.controller';
import { ScanService } from './scan.service';
import { ProjectsModule } from 'src/projects/projects.module';
import { PrismaService } from 'src/prisma.service';
import { ScannerService } from 'src/scanner/scanner.service';
import { AiModule } from 'src/ai/ai.module';

@Module({
  controllers: [ScanController],
  providers: [PrismaService, ScanService, ScannerService],
  imports: [ProjectsModule, AiModule],
})
export class ScanModule { }
