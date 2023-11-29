import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma, User as UserDB } from '@prisma/client';
import { User } from './entities/User';

export const getUserEntity = (user: UserDB): User => {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
};

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) { }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        subscription: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            endDate: true,
          }
        }
      }
    });
    return getUserEntity(user);
  }

  async findOneByCredentials(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      include: {
        subscription: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            endDate: true,
          }
        }
      }
    });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return null;
    }
    return getUserEntity(user);
  }

  async create(createUserDto: CreateUserDto) {
    const { firstName, lastName, email, password } = createUserDto;
    try {
      return getUserEntity(
        await this.prismaService.user.create({
          data: {
            firstName,
            lastName,
            email,
            passwordHash: await bcrypt.hash(password, 10),
          },
        }),
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('User already exists');
      }
      throw error;
    }
  }
}
