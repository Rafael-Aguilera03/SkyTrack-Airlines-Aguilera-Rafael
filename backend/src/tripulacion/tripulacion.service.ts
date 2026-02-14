import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Tripulacion, TripulacionDocument } from './schemas/tripulacion.schema';
import { CreateTripulacionDto } from './dto/create-tripulacion.dto';
import { UpdateTripulacionDto } from './dto/update-tripulacion.dto';
import { Vuelo, VueloDocument } from '../vuelos/schemas/vuelo.schema';

@Injectable()
export class TripulacionService {
  constructor(
    @InjectModel(Tripulacion.name) private readonly tripModel: Model<TripulacionDocument>,
    @InjectModel(Vuelo.name) private readonly vueloModel: Model<VueloDocument>,
  ) {}

  // CRUD
  async create(dto: CreateTripulacionDto): Promise<Tripulacion> {
    const created = new this.tripModel(dto);
    return created.save();
  }

  async findAll(): Promise<Tripulacion[]> {
    return this.tripModel.find({ activo: true }).exec();
  }

  async findOne(id: string): Promise<Tripulacion | null> {
    return this.tripModel.findById(id).exec();
  }

  async update(id: string, dto: UpdateTripulacionDto): Promise<Tripulacion | null> {
    return this.tripModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async remove(id: string): Promise<Tripulacion | null> {
    return this.tripModel.findByIdAndUpdate(id, { activo: false }, { new: true }).exec();
  }

  // Asignar tripulante a un vuelo (rol operador)
  async assignToVuelo(vueloId: string, tripulanteId: string): Promise<Vuelo | null> {
    return this.vueloModel.findByIdAndUpdate(
      vueloId,
      { $addToSet: { tripulacion: new Types.ObjectId(tripulanteId) } },
      { new: true }
    ).populate('tripulacion').exec();
  }

  // Quitar tripulante de un vuelo (rol operador)
  async removeFromVuelo(vueloId: string, tripulanteId: string): Promise<Vuelo | null> {
    return this.vueloModel.findByIdAndUpdate(
      vueloId,
      { $pull: { tripulacion: new Types.ObjectId(tripulanteId) } },
      { new: true }
    ).populate('tripulacion').exec();
  }
}