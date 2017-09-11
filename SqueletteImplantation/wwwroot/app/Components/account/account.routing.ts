import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from '../../app.component';
import { LoginFormComponent } from '../loginform/loginform.component';

export const routing: ModuleWithProviders = RouterModule.forRoot([
    { path: 'login', component: LoginFormComponent }
]);