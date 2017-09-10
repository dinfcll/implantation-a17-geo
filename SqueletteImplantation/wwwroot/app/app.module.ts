import { NgModule }                    from '@angular/core';
import { BrowserModule }               from '@angular/platform-browser';
import { HttpModule }                  from '@angular/http';
import { RouterModule, Routes }        from '@angular/router';

import { AppComponent }                from './app.component';
import { FooterComponent }             from './footer/footer.component';
import { HeaderComponent }             from './header/header.component';
import { LoginFormComponent }          from './loginform/loginform.component';
import { MapComponent }                from './Components/map.component';
import { UtilConnexionComponent }      from './Components/util-connexion.component'

const appRoutes:Routes = [
  {
    path: 'loginForm',
    component: LoginFormComponent
  },
  {
    path: 'map',
    component: MapComponent
  }
]

@NgModule({
  imports: [ 
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes) 
  ],
  declarations: [ 
    AppComponent,
    FooterComponent, HeaderComponent, LoginFormComponent,
    MapComponent,
    UtilConnexionComponent
  ],
  bootstrap: [ AppComponent ],
})

export class AppModule { }
