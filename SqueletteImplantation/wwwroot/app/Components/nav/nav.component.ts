import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
    selector: 'navBar',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})

export class NavBarComponent {

    constructor(private utilisateurService: UtilisateurService, private router: Router) { };

    onLogout() {
        this.utilisateurService.logout();
        this.router.navigate(['/login']);
    }

    gestionAccesPost() {
        if (localStorage.getItem('profilId') === '') {
            let confirmation;
            confirmation = confirm('Un profil est nécessaire pour créer et voir les publications.' +
                '\nVoulez-vous créer votre profil maintenant?');
            if (confirmation) {
                this.router.navigate(['/profil']);
            }

        } else {
            this.router.navigate(['/postPerso']);
        }
    }
}
