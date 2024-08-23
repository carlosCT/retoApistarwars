import { PartialType } from '@nestjs/mapped-types';
import { CreateFilmDto } from './create-actor.dto';

export class UpdateFilmDto extends PartialType(CreateFilmDto) {}
