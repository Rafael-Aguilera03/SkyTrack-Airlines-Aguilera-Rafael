import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario, UsuarioDocument } from './schemas/usuario.schema';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<UsuarioDocument>,
  ) {}

  async create(usuarioData: Partial<Usuario>): Promise<UsuarioDocument> {
    const nuevoUsuario = new this.usuarioModel(usuarioData);
    return nuevoUsuario.save();
  }

  async findAll(): Promise<UsuarioDocument[]> {
    return this.usuarioModel.find().exec();
  }

  async findById(id: string): Promise<UsuarioDocument> {
    const usuario = await this.usuarioModel.findById(id).exec();
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async update(id: string, usuarioData: Partial<Usuario>): Promise<UsuarioDocument> {
    const usuario = await this.usuarioModel.findByIdAndUpdate(id, usuarioData, { new: true }).exec();
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async remove(id: string): Promise<UsuarioDocument> {
    const usuario = await this.usuarioModel.findByIdAndDelete(id).exec();
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async findByEmail(email: string): Promise<UsuarioDocument | null> {
    return this.usuarioModel.findOne({ email }).exec();
  }
}
