import { Module } from '@nestjs/common';
import { TripulacionController } from './tripulacion.controller';
import { TripulacionService } from './tripulacion.service';

@Module({
  controllers: [TripulacionController],
  providers: [TripulacionService]
})
export class TripulacionModule {}
