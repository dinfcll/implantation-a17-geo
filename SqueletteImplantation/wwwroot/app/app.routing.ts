import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { MapComponent } from './Components/map/map.component';
import { LoginFormComponent } from './Components/loginform/loginform.component';
import { ProfilUtilisateurComponent } from './Components/profil-utilisateur/profil-utilisateur.component';

export const routing: Routes = [
    { 
        path: '', 
        redirectTo: '/login', 
        pathMatch: 'full' 
    }, 
    { 
        path: 'login', 
        component: LoginFormComponent 
    },
    { 
        path: 'map', 
        component: MapComponent,
        canActivate: [AuthGuard]
    },
    {   
        path: 'profil',
        component: ProfilUtilisateurComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: '**', 
        redirectTo: '' 
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routing) ],
    exports: [ RouterModule ]
})
export class AppRouting { }