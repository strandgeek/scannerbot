import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ScanService } from './scan.service';
import { Request } from 'express';
import { ProjectsService } from 'src/projects/projects.service';
import { ScanInput } from './scan.types';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LoggedUser } from 'src/common/decorators/logged-user.decorator';
import { User } from '@prisma/client';

@Controller('scans')
export class ScanController {
  constructor(
    private projectService: ProjectsService,
    private scanService: ScanService,
  ) { }
  @Post()
  async scan(@Req() req: Request, @Body() input: ScanInput) {
    const projectToken = req.query.project_token as string;
    if (!projectToken) {
      throw new UnauthorizedException('project token not provided');
    }
    const project = await this.projectService.findOneByProjectToken(
      projectToken,
    );
    if (!project) {
      throw new UnauthorizedException(
        'project not found for provided project token',
      );
    }
    const projectScan = await this.scanService.createScheduledScan({
      projectId: project.id,
      input,
    });
    const baseUrl = process.env.PROJECT_URL || 'https://scannerbot.xyz';
    return {
      url: `${baseUrl}/app/scans/${projectScan.id}`,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@LoggedUser() user: User) {
    return this.scanService.findAll(user.id, {}, { page: 1, perPage: 30 });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@LoggedUser() user: User, @Param('id') id: string) {
    return this.scanService.findOne(user.id, id);
  }
}
