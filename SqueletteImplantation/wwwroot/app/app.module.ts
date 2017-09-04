import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { MapComponent }     from './map.component';

@NgModule({
  imports:      [ 
    BrowserModule,
    HttpModule 
  ],
  declarations: [ 
    AppComponent,
    MapComponent
   ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
