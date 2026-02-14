import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VuelosModule } from './vuelos/vuelos.module';
import { AvionesModule } from './aviones/aviones.module';
import { TripulacionModule } from './tripulacion/tripulacion.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [VuelosModule, AvionesModule, TripulacionModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
