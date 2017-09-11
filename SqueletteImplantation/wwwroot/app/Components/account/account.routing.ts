import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginFormComponent } from '../loginform/loginform.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
    { path: 'login', component: LoginFormComponent }
]);