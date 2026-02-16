import { Controller, Get, Post, Body, Param, Delete, Put, Patch, Query, UseGuards } from '@nestjs/common';
import { VuelosService } from './vuelos.service';
import { CreateVueloDto } from './dto/create-vuelo.dto';
import { UpdateVueloDto } from './dto/update-vuelo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { TripulacionService } from '../tripulacion/tripulacion.service';

@Controller('vuelos')
export class VuelosController {
  constructor(
    private readonly vuelosService: VuelosService,
    private readonly tripulacionService: TripulacionService,
  ) {}

  // Solo admin crea vuelos
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() dto: CreateVueloDto) {
    return this.vuelosService.create(dto);
  }

  // Admin y operador pueden listar vuelos con filtros
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query('origen') origen?: string,
    @Query('destino') destino?: string,
    @Query('estado') estado?: string,
  ) {
    return this.vuelosService.findAll({ origen, destino, estado });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vuelosService.findOne(id);
  }

  // Solo admin edita datos completos del vuelo
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVueloDto) {
    return this.vuelosService.update(id, dto);
  }

  // Solo admin hace baja lógica
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vuelosService.remove(id);
  }

  // Admin y operador pueden cambiar el estado del vuelo
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'operador')
  @Patch(':id/estado')
  updateEstado(@Param('id') id: string, @Body() body: { estado: string }) {
    return this.vuelosService.updateEstado(id, body.estado);
  }

  // Operador asigna tripulantes
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('operador')
  @Put(':vueloId/tripulacion/:tripulanteId')
  assignTripulante(
    @Param('vueloId') vueloId: string,
    @Param('tripulanteId') tripulanteId: string,
  ) {
    return this.tripulacionService.assignToVuelo(vueloId, tripulanteId);
  }

  // Operador quita tripulantes
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('operador')
  @Put(':vueloId/tripulacion/remove/:tripulanteId')
  removeTripulante(
    @Param('vueloId') vueloId: string,
    @Param('tripulanteId') tripulanteId: string,
  ) {
    return this.tripulacionService.removeFromVuelo(vueloId, tripulanteId);
  }
}