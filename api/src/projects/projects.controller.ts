import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { LoggedUser } from 'src/common/decorators/logged-user.decorator';
import { User } from 'src/users/entities/User';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@LoggedUser() user: User, @Body() { name, solcVersion }: CreateProjectDto) {
    return this.projectsService.create(user.id, {
      name,
      solcVersion,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@LoggedUser() user: User) {
    return this.projectsService.findAll(user.id, {}, { page: 1, perPage: 30 });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@LoggedUser() user: User, @Param('id') id: string) {
    return this.projectsService.findOne(user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @LoggedUser() user: User,
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(user.id, id, updateProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@LoggedUser() user: User, @Param('id') id: string) {
    return this.projectsService.remove(user.id, id);
  }
}
