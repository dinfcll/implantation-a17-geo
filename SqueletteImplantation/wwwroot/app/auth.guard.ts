import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UtilisateurService } from './services/utilisateur.service'

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private utilisateurService: UtilisateurService, private router: Router) { }

    canActivate() {
        if (!this.utilisateurService.loggedIn()){
            this.router.navigate(['login']);
            return false;
        } else
            return true;          
    }
}