import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mapa-editar',
  templateUrl: './mapa-editar.component.html',
  styleUrls: ['./mapa-editar.component.css']
})
export class MapaEditarComponent {

forma: FormGroup;

//aqui debemos recibir la informacion que le enviamos como argumento desde el mapa.component
constructor(
  public fb: FormBuilder,
  public dialogRef: MatDialogRef<MapaEditarComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
) {


  this.forma = fb.group({
    'titulo': data.titulo,
    'desc': data.desc
  });
}


ngOnInit(): void {
}

guardarCambios(){

  this.dialogRef.close(this.forma.value);
}



cancelar(): void {
    this.dialogRef.close();
}

}
