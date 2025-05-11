import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: false,
    transformOptions: {
    enableImplicitConversion: true,
  },
  }))
  app.setGlobalPrefix("/api");
  const config = new DocumentBuilder()
  .setTitle("Hotel Room Managing API")
  .setDescription("Api for managing Hotel rooms")
  .setVersion("1.0")
  .addTag("Hotel Rooms")
  .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/swagger', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();