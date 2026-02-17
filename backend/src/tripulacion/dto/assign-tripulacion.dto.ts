import { IsMongoId } from 'class-validator';

export class AssignTripulacionDto {
  @IsMongoId()
  vueloId: string;

  @IsMongoId()
  tripulanteId: string;
}
