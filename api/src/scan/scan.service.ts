import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ScanInput } from './scan.types';
import { Prisma } from '@prisma/client';
import { PaginatorOptions, paginator } from 'src/common/helpers/paginator';
import { ScannerService } from 'src/scanner/scanner.service';

@Injectable()
export class ScanService {
  constructor(
    private prismaService: PrismaService,
    private scannerService: ScannerService,
  ) { }
  async createScan({
    projectId,
    input,
  }: {
    projectId: string;
    input: ScanInput;
  }) {
    const scan = await this.prismaService.projectScan.create({
      data: {
        projectId,
        input: input as unknown as Prisma.JsonObject,
        output: {},
        status: 'SCHEDULED',
      },
    });
    const scanResult = await this.scannerService.scan({
      solcVersion: '0.5.10',
      scanId: scan.id,
      files: input.files,
    });
    await this.prismaService.projectScan.update({
      where: {
        id: scan.id,
      },
      data: {
        output: scanResult as unknown as Prisma.JsonObject,
        status: 'COMPLETED',
      },
    });
    return scan;
  }

  findAll(ownerId: string, filter = {}, opts: PaginatorOptions) {
    return paginator({
      model: this.prismaService.projectScan,
      args: {
        where: {
          ...filter,
          project: {
            ownerId,
          },
        },
        include: {
          project: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      opts: opts,
    });
  }

  findOne(ownerId: string, id: string) {
    return this.prismaService.projectScan.findUnique({
      where: {
        project: {
          ownerId,
        },
        id,
      },
      include: {
        project: true,
      },
    });
  }
}
