import { CommonModule }                from '@angular/common';
import { NgModule }                    from '@angular/core';
import { BrowserModule }               from '@angular/platform-browser';
import { FormsModule }                 from '@angular/forms';
import { HttpModule }                  from '@angular/http';

import { AppComponent }                from './app.component';
import { AdminComponent }              from './Components/admin/admin.component';
import { BuddiesComponent }            from './Components/buddies/buddies.component';
import { LoadingComponent }            from './Components/loading/loading.component';
import { LoginFormComponent }          from './Components/loginform/loginform.component';
import { MapComponent }                from './Components/map/map.component';
import { NavBarComponent }             from './Components/nav/nav.component';
import { PostPersoComponent }          from './Components/postperso/postperso.component';
import { PostUserComponent }           from './Components/post/post.component';
import { ProfilUtilisateurComponent }  from './Components/profil-utilisateur/profil-utilisateur.component'
import { ResetPWComponent }            from './Components/password-reset/resetPW.component';

import { AuthGuard }                   from './auth.guard';
import { AdminGuard }                  from './admin.guard';
import { AppRouting }                  from './app.routing';
import { BuddyService }                from './services/buddy.service';
import { ConfigService }               from './services/config.service';
import { LoadingService }              from './services/loading.service';
import { UserPostService }             from './services/userpost.service';
import { UtilisateurService }          from './services/utilisateur.service';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    BuddiesComponent,
    LoadingComponent,
    LoginFormComponent,
    MapComponent,
    NavBarComponent,
    PostPersoComponent,
    PostUserComponent,
    ProfilUtilisateurComponent,    
    ResetPWComponent,
    
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
    BuddyService,
    ConfigService,
    LoadingService,    
    UserPostService,
    UtilisateurService
  ],
  bootstrap: [ AppComponent ],
})

export class AppModule { }
