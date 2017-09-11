import { CommonModule }                from '@angular/common';
import { NgModule }                    from '@angular/core';
import { BrowserModule }               from '@angular/platform-browser';
import { FormsModule }                 from '@angular/forms';
import { HttpModule }                  from '@angular/http';

import { AppComponent }                from './app.component';
import { LoginFormComponent }          from './Components/loginform/loginform.component';
import { MapComponent }                from './Components/map/map.component';

import { AccountRouting }              from './Components/account/account.routing';
import { ConfigService }               from './Components/utils/config.service';
import { UtilisateurService }          from './services/utilisateur.service';
import { EmailValidator }              from './Components/account/email.validator.directive';


@NgModule({
  declarations: [ 
    AppComponent,
    LoginFormComponent, 
    EmailValidator,
    MapComponent 
  ],
  imports: [ 
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AccountRouting
  ],
  providers: [
    ConfigService,
    UtilisateurService
  ],
  bootstrap: [ AppComponent ],
})

export class AppModule { }
