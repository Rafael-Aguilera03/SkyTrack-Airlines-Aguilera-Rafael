import { Module } from '@nestjs/common';
import { VuelosController } from './vuelos.controller';
import { VuelosService } from './vuelos.service';

@Module({
  controllers: [VuelosController],
  providers: [VuelosService]
})
export class VuelosModule {}
