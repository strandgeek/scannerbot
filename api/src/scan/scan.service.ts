import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ScanInput } from './scan.types';
import { Prisma, Project } from '@prisma/client';
import { PaginatorOptions, paginator } from 'src/common/helpers/paginator';
import { ScannerService } from 'src/scanner/scanner.service';
import { AiService } from 'src/ai/ai.service';
import { MailerService } from 'src/mailer/mailer.service';
import * as Mailjet from 'node-mailjet';

@Injectable()
export class ScanService {
  constructor(
    private prismaService: PrismaService,
    private scannerService: ScannerService,
    private aiService: AiService,
    private mailerService: MailerService,
  ) { }
  async createScan({
    project,
    input,
  }: {
    project: Project;
    input: ScanInput;
  }) {
    const scan = await this.prismaService.projectScan.create({
      data: {
        projectId: project.id,
        input: input as unknown as Prisma.JsonObject,
        output: {},
        status: 'SCHEDULED',
      },
    });
    try {
      const scanResult = await this.scannerService.scan({
        // TODO: Use solcVersion configured on project here
        solcVersion: project.solcVersion,
        scanId: scan.id,
        files: input.files,
      });
      const aiResult = await this.aiService.generateInsightsFromScanResult(
        input.files,
        scanResult,
      );
      await this.prismaService.projectScan.update({
        where: {
          id: scan.id,
        },
        data: {
          output: {
            providers: scanResult.providers,
            insights: aiResult.insights,
          } as unknown as Prisma.JsonObject,
          status: 'COMPLETED',
        },
      });
    } catch (error) {
      await this.prismaService.projectScan.update({
        where: {
          id: scan.id,
        },
        data: {
          output: {
            error: error.message,
          } as unknown as Prisma.JsonObject,
          status: 'ERROR',
        },
      });
    }

    if (process.env.MAIL_NOTIFICATIONS_ENABLED === 'true') {
      try {
        const user = await this.prismaService.user.findUnique({
          where: {
            id: project.ownerId,
          },
        });
        const body: Mailjet.SendEmailV3_1.Body = {
          Messages: [
            {
              To: [{
                Name: `${user.firstName} ${user.lastName}`,
                Email: user.email,
              }],
              TemplateID: parseInt(process.env.MAIL_NOTIFICATIONS_TEMPLATE_ID, 10),
              Variables: {
                scanId: scan.id,
              }
            }
          ],
          Globals: {
            From: {
              Name: 'ScannerBot',
              Email: 'no-reply@scannerbot.xyz',
            }
          },
        };
        await this.mailerService
          .post('send', { version: 'v3.1' })
          .request(body);
      } catch (error) {
        console.error('Could not send notification email', error);
      }
    }

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
