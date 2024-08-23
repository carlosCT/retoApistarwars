import { CreateActorDto } from "src/film/infraestructure/dto/create-actor.dto";
import { HttpResult } from "../result/http.entity";
import { HttpResultActor } from "../result/actor.result.entity";

export interface IFilmRepository {
    saveActor(payload: CreateActorDto): Promise<HttpResult>
    getActor(): Promise<{success: boolean, result: HttpResultActor}>
}