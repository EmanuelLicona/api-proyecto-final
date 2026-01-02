import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getUserProfileCredit(userId: string) {
    const { user, limitCredit, usedCredit } =
      await this.getUserCreditInformation(userId);

    return {
      userId: user.id,
      name: user.name,
      email: user.email,
      documentNumber: user.documentNumber,
      phone: user.phone,
      avatar: user.avatarUrl,

      limitCredit,
      usedCredit,
      availableCredit: limitCredit - usedCredit,
    };
  }

  async updateLastLogin(id: string, refreshToken: string) {
    return await this.prisma.user.update({
      where: { id },
      data: { refreshToken },
    });
  }

  async getUserCreditInformation(userId: string) {
    const userWithCreditLine = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { creditLine: true },
    });

    if (!userWithCreditLine) throw new NotFoundException('User not found');
    if (!userWithCreditLine.creditLine)
      throw new NotFoundException('User has no credit line');

    const creditStats = await this.prisma.operation.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        creditLineId: userWithCreditLine.creditLine.id,
        OR: [{ status: 'ACTIVE' }, { status: 'DEFAULTED' }],
      },
    });

    const usedCredit = Number(creditStats._sum.amount ?? 0);
    const limitCredit = +userWithCreditLine.creditLine.creditLimit;

    const user = {
      id: userWithCreditLine.id,
      name: userWithCreditLine.name,
      email: userWithCreditLine.email,
      documentNumber: userWithCreditLine.documentNumber,
      phone: userWithCreditLine.phone,
      avatarUrl: userWithCreditLine.avatarUrl,
    };

    return {
      user,
      creditLineId: userWithCreditLine.creditLine.id,
      limitCredit,
      usedCredit,
      avaibleCredit: limitCredit - usedCredit,
    };
  }
}
