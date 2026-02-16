import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TripulacionService } from './tripulacion.service';
import { TripulacionController } from './tripulacion.controller';
import { Tripulacion, TripulacionSchema } from './schemas/tripulacion.schema';
import { Vuelo, VueloSchema } from '../vuelos/schemas/vuelo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tripulacion.name, schema: TripulacionSchema },
      { name: Vuelo.name, schema: VueloSchema }, // necesario para asignar tripulación a vuelos
    ]),
  ],
  controllers: [TripulacionController],
  providers: [TripulacionService],
  exports: [TripulacionService], // exportar servicio para usarlo en VuelosModule
})
export class TripulacionModule {}