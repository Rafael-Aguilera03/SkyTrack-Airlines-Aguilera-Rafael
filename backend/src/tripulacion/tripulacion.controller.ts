import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TripulacionService } from './tripulacion.service';
import { CreateTripulacionDto } from './dto/create-tripulacion.dto';
import { UpdateTripulacionDto } from './dto/update-tripulacion.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('tripulacion')
export class TripulacionController {
  constructor(private readonly tripService: TripulacionService) {}

  // CRUD (solo admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() dto: CreateTripulacionDto) {
    return this.tripService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.tripService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tripService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTripulacionDto) {
    return this.tripService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tripService.remove(id);
  }

  // Asignación a vuelos (solo operador)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('operador')
  @Post('asignar')
  assignToVuelo(@Body() body: { vueloId: string; tripulanteId: string }) {
    return this.tripService.assignToVuelo(body.vueloId, body.tripulanteId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('operador')
  @Post('remover')
  removeFromVuelo(@Body() body: { vueloId: string; tripulanteId: string }) {
    return this.tripService.removeFromVuelo(body.vueloId, body.tripulanteId);
  }
}