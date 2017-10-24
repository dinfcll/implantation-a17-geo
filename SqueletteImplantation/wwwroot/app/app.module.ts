import { CommonModule }                from '@angular/common';
import { NgModule }                    from '@angular/core';
import { BrowserModule }               from '@angular/platform-browser';
import { FormsModule }                 from '@angular/forms';
import { HttpModule }                  from '@angular/http';

import { AppComponent }                from './app.component';
import { LoginFormComponent }          from './Components/loginform/loginform.component';
import { MapComponent }                from './Components/map/map.component';
import { PostUserComponent }           from './Components/post/post.component';
import { ProfilUtilisateurComponent }  from './Components/profil-utilisateur/profil-utilisateur.component'
import { NavBarComponent }             from './Components/nav/nav.component';

import { AuthGuard }                   from './auth.guard';
import { AppRouting }                  from './app.routing';
import { ConfigService }               from './services/config.service';
import { UserPostService }             from './services/userpost.service';
import { UtilisateurService }          from './services/utilisateur.service';
import { ResetPWComponent }            from './Components/password-reset/resetPW.component';

@NgModule({
  declarations: [ 
    AppComponent,
    LoginFormComponent, 
    MapComponent,
    PostUserComponent,
    ProfilUtilisateurComponent, 
    NavBarComponent,
    ResetPWComponent
  ],
  imports: [ 
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouting
  ],
  providers: [
    AuthGuard,
    ConfigService,
    UserPostService,
    UtilisateurService
  ],
  bootstrap: [ AppComponent ],
})

export class AppModule { }
