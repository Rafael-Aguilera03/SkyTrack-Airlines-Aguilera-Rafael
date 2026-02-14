import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TripulacionController } from './tripulacion.controller';
import { TripulacionService } from './tripulacion.service';
import { Tripulacion, TripulacionSchema } from './schemas/tripulacion.schema';
import { Vuelo, VueloSchema } from '../vuelos/schemas/vuelo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tripulacion.name, schema: TripulacionSchema },
      { name: Vuelo.name, schema: VueloSchema }, // Para asignar tripulación a vuelos
    ]),
  ],
  controllers: [TripulacionController],
  providers: [TripulacionService],
})
export class TripulacionModule {}
