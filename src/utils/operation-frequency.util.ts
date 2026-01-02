type Frequency = 'MONTHLY' | 'WEEKLY' | 'BIWEEKLY';

export class OperationFrequencyUtil {
  static addFrequency(
    date: Date, // en utc
    frequency: Frequency,
    multiplier = 1, // Cuanto se quiere agregar
  ): Date {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error('Invalid date provided');
    }

    const d = new Date(date);

    switch (frequency) {
      case 'MONTHLY':
        {
          const targetMonth = d.getMonth() + multiplier;
          const year = d.getFullYear() + Math.floor(targetMonth / 12);
          const month = targetMonth % 12;
          const day = d.getDate();

          d.setFullYear(year, month, 1);
          const lastDay = new Date(year, month + 1, 0).getDate();
          d.setDate(Math.min(day, lastDay));
        }
        break;

      case 'WEEKLY':
        d.setDate(d.getDate() + 7 * multiplier);
        break;

      case 'BIWEEKLY':
        d.setDate(d.getDate() + 14 * multiplier);
        break;
    }

    return d;
  }

  // Útil para calcular cuotas
  static generatePaymentSchedule(
    startDate: Date, // en utc
    frequency: Frequency,
    numberOfPayments: number,
  ): Date[] {
    return Array.from({ length: numberOfPayments }, (_, i) =>
      OperationFrequencyUtil.addFrequency(startDate, frequency, i),
    );
  }
}
