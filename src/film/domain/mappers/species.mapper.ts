export class SpecieResponse {
  public nombre: string;
  public clasificacion: string;
  public designacion: string;
  public estatura_promedio: string;
  public colores_piel: string;
  public colores_cabello: string;
  public colores_ojos: string;
  public esperanza_vida: string;
  public mundoCasa: string;
  public lenguaje: string;
  public personas: string;
  public fechaCreacion: string;
  public fechaModificacion: string;
  public url: string;

  constructor(payload) {
    this.nombre = payload.name;
    this.clasificacion = payload.classification;
    this.designacion = payload.designation;
    this.estatura_promedio = payload.average_height;
    this.colores_piel = payload.skin_colors;
    this.colores_cabello = payload.hair_colors;
    this.colores_ojos = payload.eye_colors;
    this.esperanza_vida = payload.average_lifespan;
    this.mundoCasa= payload.homeword;
    this.lenguaje= payload.language;
    this.personas= payload.people;
    this.fechaCreacion= payload.created;
    this.fechaModificacion= payload.edited;
    this.url= payload.url;
  }
}
