import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TripulacionDocument = Tripulacion & Document;

@Schema()
export class Tripulacion {
  @Prop({ required: true })
  nombre: string;

  @Prop({ 
    required: true, 
    enum: ['piloto', 'copiloto', 'tripulante de cabina'] 
  })
  rol: string;

  @Prop({ default: true })
  activo: boolean; // Baja lógica de tripulante
}

export const TripulacionSchema = SchemaFactory.createForClass(Tripulacion);
