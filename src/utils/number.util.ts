import { INTEREST_RATE_DECIMALS } from 'src/constants/precision';

export class NumberUtil {
  static round = (value: number, decimals?: number): number => {
    if (!Number.isFinite(value)) return value;

    const d = Math.max(0, decimals ?? INTEREST_RATE_DECIMALS);

    const factor = Math.pow(10, d);
    return Math.round(value * factor) / factor;
  };
}
