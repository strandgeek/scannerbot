import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ScanInput } from './scan.types';
import { Prisma } from '@prisma/client';
import { PaginatorOptions, paginator } from 'src/common/helpers/paginator';

@Injectable()
export class ScanService {
  constructor(private prismaService: PrismaService) { }
  createScheduledScan({
    projectId,
    input,
  }: {
    projectId: string;
    input: ScanInput;
  }) {
    return this.prismaService.projectScan.create({
      data: {
        projectId,
        input: input as unknown as Prisma.JsonObject,
        output: {},
        status: 'SCHEDULED',
      },
    });
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
