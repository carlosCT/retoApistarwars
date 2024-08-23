export class ActorResponse {
  public nombre: string;
  public estatura: string;
  public peso: string;
  public colorCabello: string;
  public colorPiel: string;
  public colorOjos: string;
  public fechaCumpleanhos: string;
  public genero: string;
  public mundoCasa: string;
  public peliculas: any;
  public especies: any;
  public vehiculos: any;
  public navesEstelares: any;
  public fechaCreacion: string;
  public fechaModificacion: string;
  public url: string;

  constructor(payload) {
    this.nombre = payload.name;
    this.estatura = payload.height;
    this.peso = payload.mass;
    this.colorCabello = payload.hair_color;
    this.colorPiel = payload.skin_color;
    this.colorOjos = payload.eye_color;
    this.fechaCumpleanhos = payload.birth_year;
    this.genero = payload.gender;
    this.mundoCasa= payload.homeworld;
    this.peliculas= payload.films;
    this.especies= [];
    this.vehiculos= [];
    this.navesEstelares= payload.starships;
    this.fechaCreacion= payload.created;
    this.fechaModificacion= payload.edited;
    this.url= payload.url;
  }
}
