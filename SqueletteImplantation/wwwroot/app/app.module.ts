import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { MapComponent }     from './Components/map.component';
import { UtilConnexionComponent } from './Components/util-connexion.component'


@NgModule({
  imports:      [ 
    BrowserModule,
    HttpModule 
  ],
  declarations: [ 
    AppComponent,
    MapComponent,
    UtilConnexionComponent],
  bootstrap:[ AppComponent],
})
export class AppModule { }
