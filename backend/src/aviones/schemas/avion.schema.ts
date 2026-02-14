import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AvionDocument = Avion & Document;

@Schema()
export class Avion {
  @Prop({ required: true })
  modelo: string;

  @Prop({ required: true, min: 1 })
  capacidad: number;

  @Prop({ default: 'disponible', enum: ['disponible', 'en vuelo', 'en mantenimiento'] })
  estado: string;
}

export const AvionSchema = SchemaFactory.createForClass(Avion);
