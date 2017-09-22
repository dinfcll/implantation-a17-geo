import { CommonModule }                from '@angular/common';
import { NgModule }                    from '@angular/core';
import { BrowserModule }               from '@angular/platform-browser';
import { FormsModule }                 from '@angular/forms';
import { HttpModule }                  from '@angular/http';

import { AppComponent }                from './app.component';
import { LoginFormComponent }          from './Components/loginform/loginform.component';
import { MapComponent }                from './Components/map/map.component';
import { ProfilUtilisateurComponent }  from './Components/profil-utilisateur/profil-utilisateur.component'

import { AuthGuard }                   from './auth.guard';
import { AppRouting }                  from './app.routing';
import { ConfigService }               from './Components/utils/config.service';
import { UtilisateurService }          from './services/utilisateur.service';

@NgModule({
  declarations: [ 
    AppComponent,
    LoginFormComponent, 
    MapComponent,
    ProfilUtilisateurComponent 
  ],
  imports: [ 
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouting,
  ],
  providers: [
    AuthGuard,
    ConfigService,
    UtilisateurService
  ],
  bootstrap: [ AppComponent ],
})

export class AppModule { }
