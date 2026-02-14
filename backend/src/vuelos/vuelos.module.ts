import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VuelosController } from './vuelos.controller';
import { VuelosService } from './vuelos.service';
import { Vuelo, VueloSchema } from './schemas/vuelo.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Vuelo.name, schema: VueloSchema }])],
  controllers: [VuelosController],
  providers: [VuelosService],
})
export class VuelosModule {}