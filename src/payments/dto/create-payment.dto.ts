import {
  IsEnum,
  IsNotEmpty,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

enum PAYMENT_TYPE {
  CASH = 'CASH',
  TRANSFER = 'TRANSFER',
  CARD = 'CARD',
}

export class CreatePaymentDto {
  @IsUUID('4')
  @IsNotEmpty()
  userId: string;

  @IsUUID('4')
  @IsNotEmpty()
  installmentId: string;

  @IsNotEmpty()
  @IsEnum(PAYMENT_TYPE)
  paymentType: keyof typeof PAYMENT_TYPE;

  @ValidateIf((item) => item.paymentType === PAYMENT_TYPE.CARD)
  @IsNotEmpty()
  cardName: string;

  @ValidateIf((item) => item.paymentType === PAYMENT_TYPE.CARD)
  @IsNotEmpty()
  cardNumber: string;

  @ValidateIf((item) => item.paymentType === PAYMENT_TYPE.CARD)
  @IsNotEmpty()
  cardCvv: string;

  @ValidateIf((item) => item.paymentType === PAYMENT_TYPE.CARD)
  @IsNotEmpty()
  @MaxLength(2)
  monthCard: string;

  @ValidateIf((item) => item.paymentType === PAYMENT_TYPE.CARD)
  @IsNotEmpty()
  @MaxLength(4)
  @MinLength(4)
  yearCard: string;
}
