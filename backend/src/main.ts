import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activa validación global de DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // elimina propiedades extra no definidas en el DTO
    forbidNonWhitelisted: true, // lanza error si hay propiedades no permitidas
    transform: true, // transforma payloads a la clase DTO
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();