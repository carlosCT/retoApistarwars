import { NestFactory } from '@nestjs/core';
import { Callback, Context } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { errorResponse, successResponse } from './helper/http/responseHandler';
import { CreateActorDto } from './infraestructure/dto/create-actor.dto';
import { FilmController } from './infraestructure/film.controller';
import { FilmModule } from './infraestructure/film.module';

module.exports.handler = async (event: any, context: Context) => {
  const appContext = await NestFactory.createApplicationContext(FilmModule);

  const eventsService = appContext.get(FilmController);
  try {
    console.log('event......................   ', event);
    let bodyParser;
    if (event.body) {
      const body = event.body;
      bodyParser = JSON.parse(body);
    } else {
      bodyParser = event;
    }

    const result = await eventsService.executeCreateActor(bodyParser);

    return successResponse(StatusCodes.CREATED, result);
  } catch (error) {
    return errorResponse(
      error?.statusCode,
      error?.message ?? 'Error no controlado',
    );
  }
};

module.exports.handlerActor = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  const appContext = await NestFactory.createApplicationContext(FilmModule);

  const eventsService = appContext.get(FilmController);
  try {
    const result = await eventsService.getActor();
    return successResponse(StatusCodes.OK, result);
  } catch (error) {
    return errorResponse(
      error?.statusCode,
      error?.message ?? 'Error no controlado',
    );
  }
};
