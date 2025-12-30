import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  documentNumber: string;

  @IsNotEmpty()
  phone: string;

  @IsOptional()
  avatarUrl?: string;
}
