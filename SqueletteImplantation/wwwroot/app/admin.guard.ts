import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UtilisateurService } from './services/utilisateur.service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private utilisateurService: UtilisateurService, private router: Router) { }

    canActivate() {
        let confirmation;
        confirmation = this.utilisateurService.estAdmin();
        console.log(confirmation);
        if (confirmation) {
            return true;
        } else {
            this.router.navigate(['']);
            alert('non autorisé');
            return false;
        }
    }
}
