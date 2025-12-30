import { Injectable } from '@nestjs/common';
import { UserCreateManyInput } from 'src/generated/prisma/models';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: UserCreateManyInput) {
    return await this.prisma.user.create({
      data: user,
    });
  }

  async updateUser(user: UpdateUserDto, userId: string) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...user,
        avatarUrl: user.avatarUrl ? user.avatarUrl : null,
      },
    });
  }

  async getUserById(userId: string) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async updateLastLogin(id: string, refreshToken: string) {
    return await this.prisma.user.update({
      where: { id },
      data: { refreshToken },
    });
  }
}
