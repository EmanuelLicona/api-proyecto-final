import { TIMEZONE } from 'src/constants/date';

export class DateUtils {
  // Convertir fecha local (asumiendo que está en TIMEZONE) a UTC
  static toUTC(date: Date, timezone: string = TIMEZONE): Date {
    // Obtener el string de la fecha en el timezone especificado
    const localString = date.toLocaleString('en-US', { timeZone: timezone });
    const localDate = new Date(localString);

    // Calcular el offset
    const offset = date.getTime() - localDate.getTime();

    // Retornar la fecha ajustada
    return new Date(date.getTime() + offset);
  }

  // Convertir UTC a timezone local (America/Tegucigalpa)
  static fromUTC(utcDate: Date, timezone: string = TIMEZONE): Date {
    // Obtener el string de la fecha UTC en el timezone especificado
    const localString = utcDate.toLocaleString('en-US', { timeZone: timezone });
    return new Date(localString);
  }

  // Obtener fecha actual en timezone local
  static nowLocal(timezone: string = TIMEZONE): Date {
    return DateUtils.fromUTC(new Date(), timezone);
  }

  // Convertir string a UTC
  static parseToUTC(dateString: string): Date {
    return new Date(dateString);
  }

  // Días entre dos fechas
  static getDaysBetween(date1: Date, date2: Date): number {
    const diff = Math.abs(date2.getTime() - date1.getTime());
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  // Inicio del día en UTC
  static startOfDayUTC(date: Date): Date {
    const d = new Date(date);
    d.setUTCHours(0, 0, 0, 0);
    return d;
  }

  // Fin del día en UTC
  static endOfDayUTC(date: Date): Date {
    const d = new Date(date);
    d.setUTCHours(23, 59, 59, 999);
    return d;
  }

  // Inicio del día en timezone local
  static startOfDayLocal(date: Date, timezone: string = TIMEZONE): Date {
    const local = DateUtils.fromUTC(date, timezone);
    local.setHours(0, 0, 0, 0);
    return DateUtils.toUTC(local);
  }

  // Fin del día en timezone local
  static endOfDayLocal(date: Date, timezone: string = TIMEZONE): Date {
    const local = DateUtils.fromUTC(date, timezone);
    local.setHours(23, 59, 59, 999);
    return DateUtils.toUTC(local);
  }
}
