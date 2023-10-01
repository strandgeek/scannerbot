import { Test, TestingModule } from '@nestjs/testing';
import { ScanController } from './scan.controller';
import { ProjectsService } from 'src/projects/projects.service';
import { PrismaService } from 'src/prisma.service';
import { ScanService } from './scan.service';
import { ScannerService } from 'src/scanner/scanner.service';

describe('ScanController', () => {
  let controller: ScanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScanController],
      providers: [ProjectsService, PrismaService, ScanService, ScannerService],
    }).compile();

    controller = module.get<ScanController>(ScanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
