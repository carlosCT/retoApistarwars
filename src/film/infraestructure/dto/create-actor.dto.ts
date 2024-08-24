import {JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class CreateActorDto {
   nombre: string | null;
   estatura: string | null;
   peso: string | null;
   colorCabello: string | null;
   colorPiel: string | null;
   colorOjos: string | null;
   fechaCumpleanhos: string | null;
   genero: string | null ;
}




