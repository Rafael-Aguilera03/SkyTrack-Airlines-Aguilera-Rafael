import { IsString, IsIn, IsMongoId } from 'class-validator';

export class CreateVueloDto {
  @IsString()
  origen: string;

  @IsString()
  destino: string;

  @IsIn(['programado', 'embarcando', 'en vuelo', 'aterrizado', 'cancelado'])
  estado: string;

  @IsMongoId()
  avion: string; // ID del avión asignado
}