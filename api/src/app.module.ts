import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { ScanModule } from './scan/scan.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [AuthModule, UsersModule, ProjectsModule, ScanModule],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule { }
