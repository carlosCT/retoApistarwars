import { Test } from '@nestjs/testing';

import { FilmController } from '../src/film/infraestructure/film.controller';
import { FilmService } from '../src/film/application/film.service';
import { FilmRepository } from '../src/film/infraestructure/repository/film.repository';
import { StatusCodes } from 'http-status-codes';

describe('FilmController', () => {
  let controller: FilmController;
  const mockRepository = { saveActor: jest.fn(), getActor: jest.fn() };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FilmController],
      providers: [
        {
          provide: 'FilmRepository',
          useValue: mockRepository,
        },
        {
          provide: 'FilmService',
          useFactory: (repository: FilmRepository) =>
            new FilmService(repository),
          inject: ['FilmRepository'],
        },
      ],
    }).compile();

    controller = moduleRef.get<FilmController>(FilmController);
  });

  test('register actor in dynamoDB is successfully', async () => {
    const result = {
      success: true,
      result: {
        nombre: 'Juan',
        estatura: '170',
        peso: '79',
        colorCabello: 'negro',
        colorPiel: 'mestizo',
        colorOjos: 'negro',
        fechaCumpleanhos: '1908',
        genero: 'M',
      },
    };

    const request ={
      nombre: "Juan",
      estatura: "170",
      peso: "79",
      colorCabello: "negro",
      colorPiel: "mestizo",
      colorOjos: "negro",
      fechaCumpleanhos: "1908",
      genero: "M"
  } 

    jest.spyOn(mockRepository, 'saveActor').mockImplementation(() => result);

    const response = await controller.executeCreateActor(request);

    expect(response).toEqual({
      nombre: 'Juan',
      estatura: '170',
      peso: '79',
      colorCabello: 'negro',
      colorPiel: 'mestizo',
      colorOjos: 'negro',
      fechaCumpleanhos: '1908',
      genero: 'M',
    });
  });


  test("when register of actor dont have paremeter required", async () => {
   
    const request ={
      nombre: "Juan",
      estatura: '',
      peso: '',
      colorCabello: '',
      colorPiel: 'mestizo',
      colorOjos: 'negro',
      fechaCumpleanhos: '1908',
      genero: 'M',
  } 


    try {
      await controller.executeCreateActor(request);
    } catch (error) {
       const errorFound = error?.statusCode
       expect(errorFound).toEqual(StatusCodes.BAD_REQUEST);

    }
  });


  test('get informacion from starwars api', async () => {
    const result = {
      success: true,
      result: {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        species: [],
        speciesResult: [],
        vehicles: [],
        vehiclesResult: [],
        starships: [],
        created: '2014-12-09T13:50:51.644000Z',
        edited: '2014-12-20T21:17:56.891000Z',
        url: 'https://swapi.py4e.com/api/people/1/',
      },
    };

    jest.spyOn(mockRepository, 'getActor').mockImplementation(() => result);

    const response = await controller.getActor();

    console.log('response:           ', response);

    expect(response).toEqual({
      nombre: 'Luke Skywalker',
      estatura: '172',
      peso: '77',
      colorCabello: 'blond',
      colorPiel: 'fair',
      colorOjos: 'blue',
      fechaCumpleanhos: '19BBY',
      genero: 'male',
      especies: [],
      vehiculos: [],
      navesEstelares: [],
      fechaCreacion: '2014-12-09T13:50:51.644000Z',
      fechaModificacion: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.py4e.com/api/people/1/',
    });
  });
});
