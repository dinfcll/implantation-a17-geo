import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from '../../app.component';
import { MapComponent } from '../map/map.component';
import { LoginFormComponent } from '../loginform/loginform.component';

export const routing: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, 
    { path: 'login', component: LoginFormComponent },
    { path: 'map', component: MapComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routing) ],
    exports: [ RouterModule ]
})
export class AccountRouting { }