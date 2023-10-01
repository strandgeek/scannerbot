import { Test, TestingModule } from '@nestjs/testing';
import { ScanService } from './scan.service';
import { PrismaService } from 'src/prisma.service';
import { ScannerService } from 'src/scanner/scanner.service';

describe('ScanService', () => {
  let service: ScanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScanService, PrismaService, ScannerService],
    }).compile();

    service = module.get<ScanService>(ScanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
