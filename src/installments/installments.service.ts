import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { DateUtils } from 'src/utils/date.utils';

@Injectable()
export class InstallmentsService {
  private readonly logger = new Logger(InstallmentsService.name);
  constructor(private readonly prisma: PrismaService) {}

  async markLateInstallments(cutoffUtc: Date) {
    return await this.prisma.installment.updateMany({
      where: {
        status: 'PENDING',
        dueDate: { lte: cutoffUtc },
      },
      data: {
        status: 'LATE',
      },
    });
  }

  // ==========================================================================
  // Cron Jobs
  // ==========================================================================

  // Cada dia a las 23:59 HN
  @Cron('0 59 23 * * *', {
    // @Cron('*/15 * * * * *', { // cada 15 minutos
    // @Cron(CronExpression.EVERY_, {
    timeZone: 'America/Tegucigalpa',
  })
  async assingInterestLatePaymentsCron() {
    const now = new Date();
    const endOfTodayHN = DateUtils.endOfDayLocal(now);
    const result = await this.markLateInstallments(endOfTodayHN);
    this.logger.log(`Marked ${result.count} installments as late`);
  }
}
