import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapaComponent } from './components/mapa/mapa.component';
import { MaterialModule } from './material.module';

//import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapaEditarComponent } from './components/mapa/mapa-editar.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({

  declarations: [
    AppComponent,
    MapaComponent,
    MapaEditarComponent,

  ],
  imports: [

    BrowserModule,

    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    //AIzaSyANcZr0jz2Gkgd5BjGpAVg3ELbkhTT7W3k
    GoogleMapsModule,
    ReactiveFormsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
