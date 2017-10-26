import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UtilisateurService } from './services/utilisateur.service';

declare var jBox: any;

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private utilisateurService: UtilisateurService, private router: Router) { }

    canActivate() {
        let confirmation = this.utilisateurService.estAdmin();       
        if ( confirmation == "1") {
            return true;
        } else {
            this.router.navigate(['/map']);
            new jBox('Notice', {
                content: 'Accès non autorisé',
                color: 'red',
                autoClose: 5000
            });
            return false;
        }
    }
}
