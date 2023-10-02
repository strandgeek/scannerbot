import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { ScanModule } from './scan/scan.module';
import { PrismaService } from './prisma.service';
import { AiService } from './ai/ai.service';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [AuthModule, UsersModule, ProjectsModule, ScanModule, AiModule],
  controllers: [AppController],
  providers: [PrismaService, AppService, AiService],
})
export class AppModule { }
