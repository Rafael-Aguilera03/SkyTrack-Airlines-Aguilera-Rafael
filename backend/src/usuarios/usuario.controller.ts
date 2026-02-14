import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './schemas/usuario.schema';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  // Crear usuario (accesible a todos, incluso sin login si querés registro público)
  @Post()
  async create(@Body() usuarioData: Partial<Usuario>) {
    return this.usuarioService.create(usuarioData);
  }

  // Listar todos los usuarios (solo admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Get()
  async findAll() {
    return this.usuarioService.findAll();
  }

  // Buscar usuario por ID (requiere login)
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usuarioService.findById(id);
  }

  // Actualizar usuario por ID (solo admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Put(':id')
  async update(@Param('id') id: string, @Body() usuarioData: Partial<Usuario>) {
    return this.usuarioService.update(id, usuarioData);
  }

  // Eliminar usuario por ID (solo admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usuarioService.remove(id);
  }
}
