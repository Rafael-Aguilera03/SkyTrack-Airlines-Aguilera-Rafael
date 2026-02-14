import { IsString, IsEmail, MinLength, IsEnum } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  OPERADOR = 'operador',
}

export class CreateUserDto {
  @IsString()
  readonly nombre: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsEnum(UserRole)
  readonly rol: UserRole;
}
