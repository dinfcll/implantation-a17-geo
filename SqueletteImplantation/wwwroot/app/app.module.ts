import { CommonModule }                from '@angular/common';
import { NgModule }                    from '@angular/core';
import { BrowserModule }               from '@angular/platform-browser';
import { FormsModule }                 from '@angular/forms';
import { HttpModule }                  from '@angular/http';

import { AppComponent }                from './app.component';
import { FooterComponent }             from './Components/footer/footer.component';
import { HeaderComponent }             from './Components/header/header.component';
import { LoginFormComponent }          from './Components/loginform/loginform.component';

import { routing } from './Components/account/account.routing';
import { ConfigService } from './Components/utils/config.service';
import { UtilisateurService } from './Components/services/utilisateur.service';
import { EmailValidator } from './Components/account/email.validator.directive';


@NgModule({
  declarations: [ 
    AppComponent,
    FooterComponent, HeaderComponent, 
    LoginFormComponent, EmailValidator 
  ],
  imports: [ 
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    ConfigService,
    UtilisateurService
  ],
  bootstrap: [ AppComponent ],
})

export class AppModule { }
