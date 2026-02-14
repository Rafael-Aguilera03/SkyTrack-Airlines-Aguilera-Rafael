import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AvionesService } from './aviones.service';
import { AvionesController } from './aviones.controller';
import { Avion, AvionSchema } from './schemas/avion.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Avion.name, schema: AvionSchema }])],
  controllers: [AvionesController],
  providers: [AvionesService],
})
export class AvionesModule {}
