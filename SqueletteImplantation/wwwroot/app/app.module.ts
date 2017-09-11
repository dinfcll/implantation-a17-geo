import { NgModule }                    from '@angular/core';
import { BrowserModule }               from '@angular/platform-browser';
import { FormsModule }                  from '@angular/forms';
import { HttpModule }                  from '@angular/http';

import { AppComponent }                from './app.component';
import { FooterComponent }             from './Components/footer/footer.component';
import { HeaderComponent }             from './Components/header/header.component';
import { LoginFormComponent }          from './Components/loginform/loginform.component';

import { AccountModule } from './Components/account/account.module';
import { routing } from './Components/account/account.routing';
import { ConfigService } from './Components/utils/config.service';

@NgModule({
  declarations: [ 
    AppComponent,
    FooterComponent, HeaderComponent, 
    LoginFormComponent
  ],
  imports: [ 
    AccountModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    ConfigService
  ],
  bootstrap: [ AppComponent ],
})

export class AppModule { }
