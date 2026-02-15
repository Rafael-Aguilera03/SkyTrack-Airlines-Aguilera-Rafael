import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Usuario, UsuarioDocument } from './schemas/usuario.schema';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<UsuarioDocument>,
  ) {}

  async create(usuarioData: Partial<Usuario>): Promise<UsuarioDocument> {
    if (usuarioData.password) {
      const salt = await bcrypt.genSalt();
      usuarioData.password = await bcrypt.hash(usuarioData.password, salt);
    }
    const newUser = new this.usuarioModel(usuarioData);
    return newUser.save();
  }

  async findAll(): Promise<UsuarioDocument[]> {
    return this.usuarioModel.find().exec();
  }

  async findById(id: string): Promise<UsuarioDocument> {
    const user = await this.usuarioModel.findById(id).exec();
    if (!user) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return user;
  }

  async findByEmail(email: string): Promise<UsuarioDocument | null> {
    return this.usuarioModel.findOne({ email }).exec();
  }

  async update(id: string, usuarioData: Partial<Usuario>): Promise<UsuarioDocument> {
    if (usuarioData.password) {
      const salt = await bcrypt.genSalt();
      usuarioData.password = await bcrypt.hash(usuarioData.password, salt);
    }
    const updatedUser = await this.usuarioModel.findByIdAndUpdate(id, usuarioData, { new: true }).exec();
    if (!updatedUser) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return updatedUser;
  }

  async remove(id: string): Promise<UsuarioDocument> {
    const deletedUser = await this.usuarioModel.findByIdAndDelete(id).exec();
    if (!deletedUser) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return deletedUser;
  }
}
