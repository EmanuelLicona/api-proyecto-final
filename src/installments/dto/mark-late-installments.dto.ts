import { IsDateString, IsNotEmpty } from 'class-validator';

export class MarkLateInstallmentsDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
