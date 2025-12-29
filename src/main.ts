import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false, // Si se establece en true, en lugar de quitar las propiedades que no están en la lista blanca, el validador generará una excepción.
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  if (process.env.NODE_ENV === 'dev') {
    console.log(
      `Application is running on: http://localhost:${process.env.PORT}`,
    );
  }
}

void bootstrap();
