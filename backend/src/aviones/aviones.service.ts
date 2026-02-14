import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Avion, AvionDocument } from './schemas/avion.schema';
import { CreateAvionDto } from './dto/create-avion.dto';
import { UpdateAvionDto } from './dto/update-avion.dto';

@Injectable()
export class AvionesService {
  constructor(@InjectModel(Avion.name) private readonly avionModel: Model<AvionDocument>) {}

  async create(dto: CreateAvionDto): Promise<Avion> {
    const created = new this.avionModel(dto);
    return created.save();
  }

  async findAll(): Promise<Avion[]> {
    return this.avionModel.find().exec();
  }

  async findOne(id: string): Promise<Avion | null> {
    return this.avionModel.findById(id).exec();
  }

  async update(id: string, dto: UpdateAvionDto): Promise<Avion | null> {
    return this.avionModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async remove(id: string): Promise<Avion | null> {
    return this.avionModel.findByIdAndDelete(id).exec();
  }
}
