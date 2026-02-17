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

  // Crear tripulante (admin)
  async create(dto: CreateTripulacionDto): Promise<Tripulacion> {
    const created = new this.tripModel(dto);
    return created.save();
  }

  // Listar todos los tripulantes activos
  async findAll(): Promise<Tripulacion[]> {
    return this.tripModel.find({ activo: true }).exec();
  }

  // Buscar tripulante por ID
  async findOne(id: string): Promise<Tripulacion | null> {
    return this.tripModel.findById(id).exec();
  }

  // Actualizar tripulante (admin)
  async update(id: string, dto: UpdateTripulacionDto): Promise<Tripulacion | null> {
    return this.tripModel.findByIdAndUpdate(
      id,
      dto,
      { returnDocument: 'after' }
    ).exec();
  }

  // Eliminar (soft delete: activo = false)
  async remove(id: string): Promise<Tripulacion | null> {
    return this.tripModel.findByIdAndUpdate(
      id,
      { activo: false },
      { returnDocument: 'after' }
    ).exec();
  }

  // Asignar tripulante a un vuelo (operador)
  async assignToVuelo(vueloId: string, tripulanteId: string): Promise<Vuelo | null> {
    const vuelo = await this.vueloModel.findById(vueloId).populate('tripulacion').exec();
    if (!vuelo) return null;

    const tripulante = await this.tripModel.findById(tripulanteId).exec();
    if (!tripulante) return null;

    // Validar que no haya otro tripulante con el mismo rol en el vuelo
    const rolDuplicado = vuelo.tripulacion.some(
      (t: any) => t.rol === tripulante.rol
    );
    if (rolDuplicado) {
      throw new Error(`Ya existe un ${tripulante.rol} asignado a este vuelo`);
    }

    vuelo.tripulacion.push(tripulante._id);
    await vuelo.save();

    return this.vueloModel.findById(vueloId)
      .populate('tripulacion')
      .populate('avion')
      .exec();
  }

  // Quitar tripulante de un vuelo (operador)
  async removeFromVuelo(vueloId: string, tripulanteId: string): Promise<Vuelo | null> {
    await this.vueloModel.findByIdAndUpdate(
      vueloId,
      { $pull: { tripulacion: new Types.ObjectId(tripulanteId) } }
    ).exec();

    return this.vueloModel.findById(vueloId)
      .populate('tripulacion')
      .populate('avion')
      .exec();
  }
}