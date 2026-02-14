import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {
  _id: Types.ObjectId;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; // Se almacenará encriptado con bcrypt

  @Prop({ 
    required: true, 
    enum: ['admin', 'operador'], 
    default: 'operador' 
  })
  rol: string;

  @Prop({ default: true })
  activo: boolean; // Baja lógica de usuario
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
