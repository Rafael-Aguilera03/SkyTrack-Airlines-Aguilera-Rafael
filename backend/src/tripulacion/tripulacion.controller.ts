import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TripulacionService } from './tripulacion.service';
import { CreateTripulacionDto } from './dto/create-tripulacion.dto';
import { UpdateTripulacionDto } from './dto/update-tripulacion.dto';
import { AssignTripulacionDto } from './dto/assign-tripulacion.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('tripulacion')
export class TripulacionController {
  constructor(private readonly tripService: TripulacionService) {}

  // --- CRUD (solo admin) ---
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

  // --- Asignación a vuelos (admin y operador) ---
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'operador')
  @Post('asignar')
  assignToVuelo(@Body() dto: AssignTripulacionDto) {
    return this.tripService.assignToVuelo(dto.vueloId, dto.tripulanteId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'operador')
  @Post('remover')
  removeFromVuelo(@Body() dto: AssignTripulacionDto) {
    return this.tripService.removeFromVuelo(dto.vueloId, dto.tripulanteId);
  }
}
