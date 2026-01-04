import { DateUtils } from 'src/utils/date.utils';
import { NumberUtil } from 'src/utils/number.util';

interface LateFeeCalculatorParams {
  baseAmount: number;
  lateFeeRate: number;

  dueDate: Date;
}

export class LateFeeCalculator {
  static calculate({
    baseAmount,
    lateFeeRate,
    dueDate,
  }: LateFeeCalculatorParams): number {
    const now = DateUtils.endOfDayLocal(new Date());
    const dueDateEnd = DateUtils.endOfDayLocal(dueDate);

    const daysDiff = Math.max(0, DateUtils.daysBetween(now, dueDateEnd));

    return NumberUtil.round(baseAmount * lateFeeRate * daysDiff);
  }
}
