export class VehiclesResponse {
  public nombre: string;
  public modelo: string;
  public fabricante: string;
  public costoEnCreditos: string;
  public longitud: string;
  public maxima_velocidad_admosferica: string;
  public multitud: string;
  public pasajeros: string;
  public capacidad_carga: string;
  public consumibles: string;
  public clase_vehiculo: string;
  public piloto: string;

  constructor(payload) {
    this.nombre = payload.name;
    this.modelo = payload.model;
    this.fabricante = payload.manufacturer;
    this.costoEnCreditos = payload.cost_in_credits;
    this.longitud = payload.length;
    this.maxima_velocidad_admosferica = payload.max_atmosphering_speed;
    this.multitud = payload.crew;
    this.pasajeros = payload.passengers;
    this.capacidad_carga= payload.cargo_capacity;
    this.consumibles= payload.consumables;
    this.clase_vehiculo= payload.vehicle_class;
    this.piloto= payload.pilots;
  }
}
