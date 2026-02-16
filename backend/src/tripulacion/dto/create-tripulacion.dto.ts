import { IsString, IsIn, IsBoolean, IsOptional } from 'class-validator';

export class CreateTripulacionDto {
  @IsString()
  nombre: string;

  @IsIn(['piloto', 'copiloto', 'tripulante de cabina'])
  rol: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}