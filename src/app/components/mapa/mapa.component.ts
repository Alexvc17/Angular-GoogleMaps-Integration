import { Component, ViewChild} from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Marcador } from 'src/app/classes/marcador.class';
import {
  MatDialog,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';




@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',

})
export class MapaComponent {

  //creamos un arreglo de marcadores vacio
  marcadores: Marcador[]=[];
  lat: number = -34.397;
  lng: number = 150.644;
    // Índice del marcador seleccionado
  marcadorSeleccionadoIndex: number | null = 0;


  @ViewChild(MapInfoWindow)
  infoWindow!: MapInfoWindow;

  constructor(private snackBar: MatSnackBar,
              public dialog: MatDialog
              ) {
    const markers = localStorage.getItem('marcadores');
    if (markers !== null) {
      // Lleno el arreglo con la información traída desde localStorage
      this.marcadores = JSON.parse(markers);
    }

  }


  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 4;


  agregarMarcador(event: google.maps.MapMouseEvent) {


  //convierto las coordenadas del evento en formato JSON string
  const lat = JSON.stringify(event.latLng?.lat());
  const lng = JSON.stringify(event.latLng?.lng());
  //Luego convierto de string a number
  const latNumber = parseFloat(lat);
  const lngNumber = parseFloat(lng);


  const nuevoMarcador = new Marcador(latNumber,lngNumber);
  this.marcadores.push(nuevoMarcador);
  //guardo la posicion del ultimo indice del ultimo marcador
  this.marcadorSeleccionadoIndex = this.marcadores.length - 1;
  //llamo a la funcion y guardo en el localStorage
  this.guardarStorage();



  this.snackBar.open('Marcador Agregado', 'Cerrar', {duration: 1500});

  }

  borrarMarcador(marcador:any, i:number){

    console.log(marcador, "INDEX" + i);
    //funcion de js para remover un elemento de arreglo usando splice
    //posicion inical para empezar a borrar | cuantos elementos apartir de la i quiero borrar
    this.marcadores.splice(i,1);
    this.guardarStorage();


    this.snackBar.open('Marcador Borrado', 'Cerrar', {duration: 1500});
  }

  editarMarcador(marcador: Marcador){


      const dialogRef = this.dialog.open(MapaEditarComponent, {
        width: '250px',

        data: {titulo: marcador.titulo, desc: marcador.descripcion},
      });

     //el resultado va a ser la informacion que viene del modal en el momento en que se cierra..
     //luego me subscribo a ese evento emitido
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        //debo editar el marcador que recibo como argumento
        //si el result esta vacio no hago nada
        if(!result){
          return;
        }

        //el marcador actual va ser remplada por la respuesta que es enviada desde el modal
        marcador.titulo = result.titulo;
        marcador.descripcion = result.desc;

        //guardamos el marcador en el localStorage y agregamos un snack de confirmacion
        this.guardarStorage();
        this.snackBar.open('Marcador Editado', 'Cerrar', {duration: 1500});

      });


  }


  guardarStorage(){
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

  openInfoWindow(marker: MapMarker, i: number) {
    //para verificar que el marcador no sea indefinido y salga error en el infi window
    if (this.infoWindow) {
      this.infoWindow.open(marker);
      this.marcadorSeleccionadoIndex = i;
    }else{
      console.log("marcador position")
      this.marcadorSeleccionadoIndex = i;
      console.log(this.marcadorSeleccionadoIndex = i)

      return;
    }
  }



}



