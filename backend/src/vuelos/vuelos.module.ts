import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VuelosService } from './vuelos.service';
import { VuelosController } from './vuelos.controller';
import { Vuelo, VueloSchema } from './schemas/vuelo.schema';
import { Avion, AvionSchema } from '../aviones/schemas/avion.schema';
import { TripulacionModule } from '../tripulacion/tripulacion.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vuelo.name, schema: VueloSchema },
      { name: Avion.name, schema: AvionSchema },
    ]),
    TripulacionModule,
  ],
  controllers: [VuelosController],
  providers: [VuelosService],
})
export class VuelosModule {}
