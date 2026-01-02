import {
  IsUUID,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
  IsNumber,
  IsPositive,
  IsEnum,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';

export class CreateOperationDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsPositive()
  term: number;

  @IsArray()
  @ArrayNotEmpty() // asegura que el array no esté vacío
  @ArrayUnique() // asegura que no haya IDs repetidos
  @IsUUID('4', { each: true }) // valida que cada productId sea UUID v4
  productIds: string[];

  @IsNotEmpty()
  @IsEnum(['WEEKLY', 'BIWEEKLY', 'MONTHLY'])
  frequency: 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';

  @IsNotEmpty()
  @IsDateString()
  disbursedAt: Date; // fecha en se entraga el producto / dinero
}
