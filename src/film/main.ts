import { Callback, Context } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { FilmModule } from './infraestructure/film.module';
import { FilmController } from './infraestructure/film.controller';

module.exports.handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  const appContext = await NestFactory.createApplicationContext(FilmModule);
  const eventsService = appContext.get(FilmController);
  try {
     const result = await eventsService.executeCreateActor(event);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: result
      }),
    }
  } catch (error) {
    return {
      statusCode: error?.statusCode ?? 400,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        message: error?.message ?? 'Error no controlado'
      }),
    }
  }
}


module.exports.handlerActor = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  const appContext = await NestFactory.createApplicationContext(FilmModule);
  const eventsService = appContext.get(FilmController);
  try {
     const result = await eventsService.getActor(event);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: result
      }),
    }
  } catch (error) {
    return {
      statusCode: error?.statusCode ?? 400,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        message: error?.message ?? 'Error no controlado'
      }),
    }
  }
}