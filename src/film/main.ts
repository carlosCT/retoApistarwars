import { NestFactory } from "@nestjs/core";
import { FilmModule } from "./infraestructure/film.module";
import { writeFileSync } from "fs";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(FilmModule);

  const options = new DocumentBuilder()
    .setTitle('Film example')
    .setDescription('The Film API description')
    .setVersion('1.0')
    .addTag('film')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  const outputPath = "./swagger.json"
  writeFileSync(outputPath, JSON.stringify(document), { encoding: 'utf8'});

  await app.close();
}
bootstrap();