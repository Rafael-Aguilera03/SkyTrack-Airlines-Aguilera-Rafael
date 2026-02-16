import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VuelosService } from './vuelos.service';
import { VuelosController } from './vuelos.controller';
import { Vuelo, VueloSchema } from './schemas/vuelo.schema';
import { TripulacionModule } from '../tripulacion/tripulacion.module'; // importar módulo

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vuelo.name, schema: VueloSchema }]),
    TripulacionModule, // necesario para que VuelosController pueda inyectar TripulacionService
  ],
  controllers: [VuelosController],
  providers: [VuelosService],
})
export class VuelosModule {}