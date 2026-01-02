import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllProducts() {
    return await this.prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        brand: true,
        price: true,
        baseRate: true,
        maxTerm: true,
      },
      where: {
        status: 'ACTIVE',
      },
    });
  }
}
