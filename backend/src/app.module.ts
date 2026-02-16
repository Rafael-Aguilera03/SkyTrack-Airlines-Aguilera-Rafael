import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuarios/usuario.module';
import { AvionesModule } from './aviones/aviones.module';
import { TripulacionModule } from './tripulacion/tripulacion.module';
import { VuelosModule } from './vuelos/vuelos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI')!,
      }),
    }),
    AuthModule,
    UsuarioModule,
    AvionesModule,
    TripulacionModule,
    VuelosModule,
  ],
})
export class AppModule {}