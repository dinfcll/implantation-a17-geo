import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UtilisateurService } from './services/utilisateur.service'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private utilisateur: UtilisateurService, private router: Router) { }

    canActivate() {

        if (!this.utilisateur.loggedIn())
        {
            this.router.navigateByUrl('/login');
            return false;
        } else {
            return true;
        }            
    }
}