import { HttpError } from '../domain/exceptions/payment.exception';
import { ActorResponse } from '../domain/mappers/actor.mapper';
import { SpecieResponse } from '../domain/mappers/species.mapper';
import { VehiclesResponse } from '../domain/mappers/vehicles.mapper';
import { IFilmRepository } from '../domain/repository/film.repository';
import { CreateActorDto } from '../infraestructure/dto/create-actor.dto';

export class FilmService {
  constructor(private readonly repositoryPayment: IFilmRepository) {}

  async executeCreateActor(payload: CreateActorDto) {
    const { success, result } = await this.repositoryPayment.saveActor(payload);

    console.log('respuesta de repository   ..........', success);
    if (success) {
      return result;
    }
    throw new HttpError();
  }

  async getActor() {
    const { success, result } = await this.repositoryPayment.getActor();

    console.log('respuesta de repository   ..........', result);
    if (success) {
      const res = new ActorResponse(result);

      console.log('response of service - getActor ', res);

      for (let specie of result.speciesResult) {
        res.especies.push(new SpecieResponse(specie));
      }

      for (let vehicle of result.vehiclesResult) {
        res.vehiculos.push(new VehiclesResponse(vehicle));
      }
      return res;
    }

    throw new HttpError();
  }
}
