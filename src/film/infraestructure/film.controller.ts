import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Post,
} from '@nestjs/common';
import { FilmService } from '../application/film.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { HttpError } from '../domain/exceptions/payment.exception';

@Controller('payment')
export class FilmController {

  private readonly logger = new Logger('FilmController');

  constructor(
    @Inject('FilmService') private readonly filmService: FilmService,
  ) {}

  @Post()
  async executeCreateActor(@Body() request: CreateActorDto) {
    this.logger.log('Start to create actor');
    this.logger.log(
      `Payload: ${JSON.stringify(request)}`,
      'FilmController - executeCreateActor',
    );
    try {
      const result = await this.filmService.executeCreateActor(request);
      return result;
    } catch (error) {
      if (error instanceof HttpError) {
        this.logger.error(
          `Http Error ${JSON.stringify(error)}`,
          'FilmController - executeCreateActor',
        );
        throw new HttpException(
          'Process to save film hava a error',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }
      throw error;
    }
  }


  @Get()
  async getActor(@Body() request: CreateActorDto) {
    try {
      const result = await this.filmService.getActor();
      return result;
    } catch (error) {
      if (error instanceof HttpError) {
        this.logger.error(
          `Http Error ${JSON.stringify(error)}`,
          'FilmController - getActor',
        );

        
        throw new HttpException(
          'Process to get actor have a error',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }
      throw error;
    }
  }
}
