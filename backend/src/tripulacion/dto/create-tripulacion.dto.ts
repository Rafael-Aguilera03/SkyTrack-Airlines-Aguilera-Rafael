import { IsString, IsIn } from 'class-validator';

export class CreateTripulacionDto {
  @IsString()
  nombre: string;

  @IsIn(['piloto', 'copiloto', 'tripulante de cabina'])
  rol: string;
}