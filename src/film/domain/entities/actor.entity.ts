export class Actor {
  public id: string;
  public nombre: string;
  public estatura: string;
  public peso: string;
  public colorCabello: string;
  public colorPiel: string;
  public colorOjos: string;
  public fechaCumpleanhos: string;
  public genero: string;

  constructor(
    id: string,
    nombre: string,
    estatura: string,
    peso: string,
    colorCabello: string,
    colorPiel: string,
    colorOjos: string,
    fechaCumpleanhos: string,
    genero: string,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.estatura = estatura;
    this.peso = peso;
    this.colorCabello = colorCabello;
    this.colorPiel = colorPiel;
    this.colorOjos = colorOjos;
    this.fechaCumpleanhos = fechaCumpleanhos;
    this.genero = genero;
  }
}
