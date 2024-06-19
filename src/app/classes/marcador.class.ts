export class Marcador{

  public lat!: number;
  public lng!: number;

  public titulo:string = 'Sin Titulo';
  public descripcion: string = 'Sin descripcion';

  constructor( lat:number,  lng:number){



    this.lat = lat;
    this.lng = lng;



  }
}
