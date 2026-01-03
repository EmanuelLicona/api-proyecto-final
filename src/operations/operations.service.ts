import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UsersService } from 'src/users/users.service';
import { Product } from 'src/generated/prisma/client';
import { NumberUtil } from 'src/utils/number.util';
import { OperationFrequencyUtil } from 'src/utils/operation-frequency.util';
import { DateUtils } from 'src/utils/date.utils';

@Injectable()
export class OperationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
  ) {}

  async getOperatiosByUser(userId: string) {
    const list = await this.prisma.operation.findMany({
      where: {
        creditLine: {
          userId,
        },
      },
      include: {
        operationProducts: {
          include: {
            product: true,
          },
        },
        installments: {
          orderBy: {
            number: 'asc',
          },
        },
      },
    });

    const temp = list.map((op) => ({
      id: op.id,
      amount: +op.amount,
      interestRate: +op.interestRate,
      interestAmount: NumberUtil.round(+op.amount.mul(op.interestRate)),
      totalOperationAmount: NumberUtil.round(
        +op.amount.mul(op.interestRate).plus(op.amount),
      ),
      term: op.term,
      frequency: op.frequency,
      disbursedAt: op.disbursedAt,
      status: op.status,
      products: op.operationProducts.map((opProduct) => ({
        id: opProduct.product.id,
        name: opProduct.product.name,
        price: +opProduct.amount,
        interestRate: +opProduct.interestRate,
        interestAmount: NumberUtil.round(
          +opProduct.amount.mul(opProduct.interestRate),
        ),
        imageUrl: opProduct.product.imageUrl,
      })),
      installments: op.installments.map((installment) => ({
        number: installment.number,
        dueDate: installment.dueDate,
        interest: +installment.interest,
        principal: +installment.principal,
        amount: +installment.amount,
        lateInterest: +installment.lateInterest,
        paidAt: installment.paidAt,
        status: installment.status,
      })),
    }));

    return {
      operations: temp,
    };
  }

  async createOperation({
    term,
    userId,
    productIds,
    frequency,
    disbursedAt: disbursedAtString,
  }: CreateOperationDto) {
    const disbursedAt = DateUtils.toUTC(new Date(disbursedAtString));

    // Validar que el usuario tenga credito disponible
    const userCreditInfo =
      await this.userService.getUserCreditInformation(userId);

    // Validar que los productos tengan un ID y un término válido
    const productsDb = await this.validateAndGetProductsForOperation(
      productIds,
      term,
    );

    // Calcular montos de interes y totales
    const cals = this.calculateProductsAmounts(
      productsDb,
      userCreditInfo.limitCredit,
    );
    const installmentAmountBase = NumberUtil.round(cals.baseAmount / term);
    const installmentInterest = NumberUtil.round(cals.totalInterest / term);
    const installmentAmount = NumberUtil.round(cals.totalAmount / term);

    const paymentDateList = OperationFrequencyUtil.generatePaymentSchedule(
      disbursedAt,
      frequency,
      term,
    );

    await this.prisma.$transaction(async (tx) => {
      //  Crear operación
      await tx.operation.create({
        data: {
          creditLineId: userCreditInfo.creditLineId,
          amount: cals.baseAmount,
          interestRate: cals.interestRate,
          lateRate: 0.05,
          term,
          frequency,
          disbursedAt,
          operationProducts: {
            createMany: {
              data: productsDb.map((product) => ({
                productId: product.id,
                amount: product.price,
                interestRate: product.baseRate,
              })),
            },
          },

          installments: {
            createMany: {
              data: paymentDateList.map((installmentDate, i) => ({
                number: i + 1,
                dueDate: installmentDate,
                amount: installmentAmount,
                principal: installmentAmountBase,
                interest: installmentInterest,
              })),
            },
          },
        },
      });
    });

    return {
      message: 'Operation created successfully',
    };
  }

  // ==========================================================================
  // Metodos privados para calcular la operacion
  // ==========================================================================

  // Obtiene los productos para el calculo de la operación
  private async validateAndGetProductsForOperation(
    productIds: string[],
    term: number,
  ) {
    const products = await this.prisma.product.findMany({
      where: {
        id: { in: productIds },
        status: 'ACTIVE',
        maxTerm: {
          gte: term,
        },
      },
    });
    if (products.length !== productIds.length)
      throw new BadRequestException('Products not valid');

    return products;
  }

  // Calcula el monto total de cada producto
  private calculateProductsAmounts(productsDb: Product[], baseRate: number) {
    const products = productsDb.map((product) => {
      const price = product.price;

      const interestRate = product.baseRate || baseRate; // tasa de interes
      const interestAmount = price.mul(interestRate); // cantidad de interes
      const totalAmount = price.plus(interestAmount); // monto del procio del producto mas el interes

      return {
        id: product.id,
        price: +price,
        interestRate: +interestRate,
        interestAmount: +interestAmount,
        totalAmount: +totalAmount,
      };
    });

    const rawRate =
      products.reduce((acc, p) => acc + p.interestRate, 0) / products.length;
    const interestRate = NumberUtil.round(rawRate);

    const totalInterest = NumberUtil.round(
      products.reduce((acc, p) => acc + p.interestAmount, 0),
    );

    const baseAmount = NumberUtil.round(
      products.reduce((acc, p) => acc + p.price, 0),
    );

    const totalAmount = NumberUtil.round(
      products.reduce((acc, p) => acc + p.totalAmount, 0),
    );

    return {
      products,
      interestRate,

      baseAmount,
      totalInterest,
      totalAmount,
    };
  }
}
