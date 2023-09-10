import { Module } from '@nestjs/common';
import Config from '../app.config';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [PrismaService, UsersService, AuthService],
  imports: [
    JwtModule.register({
      secret: Config.JWT_SECRET,
      signOptions: { expiresIn: Config.JWT_TOKEN_EXPIRATION },
    }),
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule { }
