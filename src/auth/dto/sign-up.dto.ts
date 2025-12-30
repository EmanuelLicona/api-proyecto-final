import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  documentNumber: string;

  @IsNotEmpty()
  phone: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minUppercase: 1,
    minLowercase: 1,
  })
  @IsNotEmpty()
  password: string;
}
