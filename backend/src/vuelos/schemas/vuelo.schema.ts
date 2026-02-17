import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Avion } from '../../aviones/schemas/avion.schema';

export type VueloDocument = Vuelo & Document;

@Schema()
export class Vuelo {
  @Prop({ required: true })
  origen: string;

  @Prop({ required: true })
  destino: string;

  @Prop({
    required: true,
    enum: ['programado', 'embarcando', 'en vuelo', 'aterrizado', 'cancelado'],
    default: 'programado',
  })
  estado: string;


  @Prop({ type: Types.ObjectId, ref: Avion.name, required: true })
  avion: Types.ObjectId;

  @Prop({ default: true })
  activo: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Tripulacion' }] })
  tripulacion: Types.ObjectId[];
}

export const VueloSchema = SchemaFactory.createForClass(Vuelo);
