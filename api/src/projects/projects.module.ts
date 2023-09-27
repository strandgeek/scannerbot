import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProjectsController],
  providers: [PrismaService, ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule { }
