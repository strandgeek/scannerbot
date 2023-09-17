import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma.service';
import { PaginatorOptions, paginator } from 'src/common/helpers/paginator';

@Injectable()
export class ProjectsService {
  constructor(private prismaService: PrismaService) { }

  create(ownerId: string, createProjectDto: CreateProjectDto) {
    const { name } = createProjectDto;
    const accessToken = Math.random().toString(36).substr(2);
    return this.prismaService.project.create({
      data: {
        name,
        ownerId,
        accessToken,
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
