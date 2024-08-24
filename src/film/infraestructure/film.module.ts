import { Logger, Module, ValidationPipe } from '@nestjs/common';
import { FilmController } from './film.controller';
import { FilmService } from '../application/film.service';
import { FilmRepository } from './repository/film.repository';
import { HttpModule } from '@nestjs/axios';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    
  ],
  controllers: [FilmController],
  providers: [
    Logger,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide:'FilmRepository',
      useClass: FilmRepository
    },
    {
      provide: 'FilmService',
      useFactory: (repository: FilmRepository) => new FilmService(repository),
      inject: ['FilmRepository']
    }
  ],
})
export class FilmModule {}
