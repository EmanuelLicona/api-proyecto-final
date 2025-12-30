import { IsNotEmpty } from 'class-validator';

export class UpdateProfileDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  documentNumber: string;

  @IsNotEmpty()
  phone: string;
}
