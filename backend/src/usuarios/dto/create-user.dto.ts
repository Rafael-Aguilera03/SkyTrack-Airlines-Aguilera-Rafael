import { IsString, IsEmail, MinLength, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsIn(['admin', 'operador'])
  rol: string;
}