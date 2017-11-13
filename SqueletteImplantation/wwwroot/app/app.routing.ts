import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';

import { AdminComponent } from './Components/admin/admin.component';
import { BuddiesComponent } from './Components/buddies/buddies.component';
import { LoginFormComponent } from './Components/loginform/loginform.component';
import { MapComponent } from './Components/map/map.component';
import { PostPersoComponent } from './Components/postperso/postperso.component';
import { ProfilUtilisateurComponent } from './Components/profil-utilisateur/profil-utilisateur.component';
import { ResetPWComponent } from './Components/password-reset/resetPW.component';

export const routing: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard, AdminGuard]
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
        path: 'postPerso',
        component: PostPersoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'profil',
        component: ProfilUtilisateurComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'resetPW',
        component: ResetPWComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'buddies',
        component: BuddiesComponent,
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
