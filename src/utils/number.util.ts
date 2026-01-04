import Decimal from 'decimal.js';
import { INTEREST_RATE_DECIMALS } from 'src/constants/precision';

export class NumberUtil {
  static round = (value: number, decimals?: number): number => {
    if (value === null || value === undefined) {
      throw new Error('Invalid number: value is null or undefined');
    }

    const d = decimals ?? INTEREST_RATE_DECIMALS;
    const decimalValue = new Decimal(value);
    return decimalValue.toDecimalPlaces(d, Decimal.ROUND_HALF_UP).toNumber();
  };
}
