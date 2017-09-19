import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UtilisateurService } from './services/utilisateur.service'

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private utilisateurService: UtilisateurService, private router: Router) { }

    canActivate() {
        if(this.utilisateurService.loggedIn() == null){
            this.router.navigate(['']);
            return false;          
        } else {
            console.log(localStorage.getItem('token'))
            return true;
        }         
    }
}