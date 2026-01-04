import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { type CreatePaymentDto } from './dto/create-payment.dto';
import { LateFeeCalculator } from 'src/core/installments/late-fee-calculator';
import { NumberUtil } from 'src/utils/number.util';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async generateInstallmentPay(paymentDto: CreatePaymentDto) {
    const installment = await this.prisma.installment.findUnique({
      where: {
        id: paymentDto.installmentId,
        status: {
          notIn: ['INACTIVE'],
        },
        operation: {
          creditLine: {
            userId: paymentDto.userId,
            status: 'ACTIVE',
          },
        },
      },
      include: {
        operation: true,
      },
    });

    if (!installment) throw new NotFoundException('Installment not found');
    if (installment.status === 'PAID')
      throw new BadGatewayException(' Installment is paid');

    try {
      await this.prisma.$transaction(
        async (tx) => {
          const lateInterest = LateFeeCalculator.calculate({
            baseAmount: +installment.amount,
            lateFeeRate: +installment.operation.lateRate,
            dueDate: installment.dueDate,
          });

          const totalAmount = NumberUtil.round(
            +installment.amount + lateInterest,
          );

          await tx.installment.update({
            where: { id: installment.id },
            data: { status: 'PAID', paidAt: new Date(), lateInterest },
          });

          await tx.payment.create({
            data: {
              installmentId: installment.id,
              amount: totalAmount,
              method: paymentDto.paymentType,
              paidAt: new Date(),
            },
          });

          const numInstallmentsPaid = await tx.installment.count({
            where: {
              status: 'PAID',
              operationId: installment.operationId,
            },
          });

          if (numInstallmentsPaid === installment.operation.term) {
            await tx.operation.update({
              where: { id: installment.operationId },
              data: { status: 'PAID' },
            });
          }

          // TODO: pasarela de pago
        },
        {
          timeout: 1000 * 60 * 5, // 5 minutos
          maxWait: 1000 * 60 * 5, // 5 minutos
        },
      );

      return {
        message: 'Payment created successfully',
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error creating payment');
    }
  }
}
