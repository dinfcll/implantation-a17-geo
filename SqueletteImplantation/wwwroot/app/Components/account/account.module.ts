import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UtilisateurService } from '../services/utilisateur.service';

import { EmailValidator } from '../account/email.validator.directive';

import { routing } from './account.routing';
//import { LoginFormComponent } from '../loginform/loginform.component';

@NgModule({
    imports: [
        CommonModule, FormsModule, routing
    ],
    declarations: [
        EmailValidator
    ],
    providers: [ UtilisateurService ]
})

export class AccountModule { }