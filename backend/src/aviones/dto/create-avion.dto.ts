import { IsString, IsInt, Min, IsOptional, IsIn } from 'class-validator';

export class CreateAvionDto {
  @IsString()
  modelo: string;

  @IsInt()
  @Min(1)
  capacidad: number;

  @IsOptional()
  @IsIn(['disponible', 'en vuelo', 'en mantenimiento'])
  estado?: string;
}
