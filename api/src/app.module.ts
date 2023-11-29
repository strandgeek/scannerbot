import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { ScanModule } from './scan/scan.module';
import { PrismaService } from './prisma.service';
import { AiService } from './ai/ai.service';
import { AiModule } from './ai/ai.module';
import { BillingModule } from './billing/billing.module';
import { RawBodyMiddleware } from './common/middlewares/raw-body.middleware';
import { JsonBodyMiddleware } from './common/middlewares/json-body.mddleware';

@Module({
  imports: [AuthModule, UsersModule, ProjectsModule, ScanModule, AiModule, BillingModule],
  controllers: [AppController],
  providers: [PrismaService, AppService, AiService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RawBodyMiddleware)
      .forRoutes(
        {
          path: '/billing/webhook',
          method: RequestMethod.POST,
        },
      )
      .apply(JsonBodyMiddleware)
      .forRoutes('*');
  }
}
