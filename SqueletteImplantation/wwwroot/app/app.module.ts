import { CommonModule }                from '@angular/common';
import { NgModule }                    from '@angular/core';
import { BrowserModule }               from '@angular/platform-browser';
import { FormsModule }                 from '@angular/forms';
import { HttpModule }                  from '@angular/http';

import { AppComponent }                from './app.component';
import { AdminComponent }              from './Components/admin/admin.component';
import { LoginFormComponent }          from './Components/loginform/loginform.component';
import { MapComponent }                from './Components/map/map.component';
import { PostUserComponent }           from './Components/post/post.component';
import { ProfilUtilisateurComponent }  from './Components/profil-utilisateur/profil-utilisateur.component'
import { NavBarComponent }             from './Components/nav/nav.component';
import { BuddiesComponent }            from './Components/buddies/buddies.component';

import { AuthGuard }                   from './auth.guard';
import { AdminGuard }                  from './admin.guard';
import { AppRouting }                  from './app.routing';
import { ConfigService }               from './services/config.service';
import { UserPostService }             from './services/userpost.service';
import { UtilisateurService }          from './services/utilisateur.service';
import { BuddyService }                from './services/buddy.service';
import { ResetPWComponent }            from './Components/password-reset/resetPW.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginFormComponent,
    MapComponent,
    PostUserComponent,
    ProfilUtilisateurComponent, 
    NavBarComponent,
    ResetPWComponent,
    BuddiesComponent
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
    AdminGuard,
    ConfigService,
    UtilisateurService,
    BuddyService,
    UserPostService,
    UtilisateurService
  ],
  bootstrap: [ AppComponent ],
})

export class AppModule { }
