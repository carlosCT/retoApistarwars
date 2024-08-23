import { Injectable, Logger } from '@nestjs/common';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import axios from 'axios';
import { Actor } from 'src/film/domain/entities/actor.entity';
import { uuid } from 'uuidv4';
import { IFilmRepository } from '../../domain/repository/film.repository';
import { CreateActorDto } from '../dto/create-actor.dto';
import { HttpResult } from 'src/film/domain/result/http.entity';
import { HttpResultActor } from 'src/film/domain/result/actor.result.entity';

@Injectable()
export class FilmRepository implements IFilmRepository {
  private readonly logger = new Logger('FilmRepository');

  constructor() {}
  private readonly dynamoClient: DocumentClient = new DocumentClient();

  async getActor(): Promise<{success: boolean, result: HttpResultActor}> {
    this.logger.log('Start execute get Actor', 'FilmRepository - execute');
    try {
      const API = 'https://swapi.py4e.com/api/people/1/';
      const result = await axios.get(API);

      this.logger.log(`data API result  ${JSON.stringify(result.data)} `);

      // const res = new ActorResponse(result.data);

      this.logger.log("data result of specie by actor");
      const arraySpecie=[];
      for(let specie of result.data.species){
        const resultSpecies = await axios.get(specie);
        arraySpecie.push(resultSpecies.data) 
      }

      result.data.speciesResult=arraySpecie;
      const arrayVehicles=[];
      for(let vehicle of result.data.vehicles){
        const resultVehicles = await axios.get(vehicle);
        arrayVehicles.push(resultVehicles.data) 
      }
      result.data.vehiclesResult=arrayVehicles;
      // console.log("result of repository  ", result.data);
      return {
        success: true,
        result: result.data
      };
      
    } catch (error) {
      console.log(error);
      this.logger.error(
        `Http Error ${JSON.stringify(error)}`,
        'FilmRepository - getActor',
      );
      throw error;
    }
  }

  async saveActor(actor: CreateActorDto): Promise<HttpResult> {
    const actorData = new Actor(
      uuid(),
      actor.nombre,
      actor.estatura,
      actor.peso,
      actor.colorCabello,
      actor.colorPiel,
      actor.colorOjos,
      actor.fechaCumpleanhos,
      actor.genero,
    );

    await this.dynamoClient
      .put({
        TableName: process.env.FILM_TABLE,
        Item: actorData,
      })
      .promise();

    this.logger.log(`Actor saved`);
    return {
      success: true,
      result: actorData,
    };
  }
}
