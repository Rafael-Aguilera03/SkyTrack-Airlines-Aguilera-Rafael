import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vuelo, VueloDocument } from './schemas/vuelo.schema';
import { CreateVueloDto } from './dto/create-vuelo.dto';
import { UpdateVueloDto } from './dto/update-vuelo.dto';

@Injectable()
export class VuelosService {
  constructor(@InjectModel(Vuelo.name) private readonly vueloModel: Model<VueloDocument>) {}

  async create(dto: CreateVueloDto): Promise<Vuelo> {
    const created = new this.vueloModel(dto);
    return created.save();
  }

  async findAll(filters?: { origen?: string; destino?: string; estado?: string }): Promise<Vuelo[]> {
    const query: any = { activo: true };

    if (filters?.origen) query.origen = filters.origen;
    if (filters?.destino) query.destino = filters.destino;
    if (filters?.estado) query.estado = filters.estado;

    return this.vueloModel
      .find(query)
      .populate('avion')
      .populate('tripulacion')
      .exec();
  }

  async findOne(id: string): Promise<Vuelo | null> {
    return this.vueloModel
      .findById(id)
      .populate('avion')
      .populate('tripulacion')
      .exec();
  }

  async update(id: string, dto: UpdateVueloDto): Promise<Vuelo | null> {
    return this.vueloModel
      .findByIdAndUpdate(id, dto, { returnDocument: 'after' }) 
      .populate('avion')
      .populate('tripulacion')
      .exec();
  }

  // Baja lógica: no borra, solo marca activo=false
  async remove(id: string): Promise<Vuelo | null> {
    return this.vueloModel
      .findByIdAndUpdate(id, { activo: false }, { returnDocument: 'after' }) 
      .populate('avion')
      .populate('tripulacion')
      .exec();
  }

  // admin y operador pueden cambiar estado del vuelo
  async updateEstado(id: string, estado: string): Promise<Vuelo | null> {
    return this.vueloModel
      .findByIdAndUpdate(id, { estado }, { returnDocument: 'after' })
      .populate('avion')
      .populate('tripulacion')
      .exec();
  }
}
