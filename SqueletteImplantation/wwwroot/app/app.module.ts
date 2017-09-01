import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { UtilConnexionComponent } from './Components/util-connexion.component'
import { MapComponent }  from './Components/map.component';
import { RandonneeComponent } from './Components/randonnee.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, UtilConnexionComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
