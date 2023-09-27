import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma.service';
import { PaginatorOptions, paginator } from 'src/common/helpers/paginator';
import { randomBytes } from 'crypto';

const generateProjectToken = () => randomBytes(32).toString('hex');

@Injectable()
export class ProjectsService {
  constructor(private prismaService: PrismaService) { }

  create(ownerId: string, createProjectDto: CreateProjectDto) {
    const { name } = createProjectDto;
    const projectToken = generateProjectToken();
    return this.prismaService.project.create({
      data: {
        name,
        ownerId,
        projectToken,
      },
    });
  }

  findAll(ownerId: string, filter = {}, opts: PaginatorOptions) {
    return paginator({
      model: this.prismaService.project,
      args: {
        where: {
          ...filter,
          ownerId,
        },
      },
      opts: opts,
    });
  }

  findOne(ownerId: string, id: string) {
    return this.prismaService.project.findUnique({
      where: {
        ownerId,
        id,
      },
    });
  }

  findOneByProjectToken(projectToken: string) {
    return this.prismaService.project.findUnique({
      where: {
        projectToken,
      },
    });
  }

  update(ownerId: string, id: string, updateProjectDto: UpdateProjectDto) {
    return this.prismaService.project.update({
      where: {
        ownerId,
        id,
      },
      data: {
        ...updateProjectDto,
      },
    });
  }

  remove(ownerId: string, id: string) {
    return this.prismaService.project.delete({
      where: {
        ownerId,
        id,
      },
    });
  }
}
