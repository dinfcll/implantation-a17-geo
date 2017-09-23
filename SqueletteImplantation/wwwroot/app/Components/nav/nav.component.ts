import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
    selector: 'navBar',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})

export class NavBarComponent{
    constructor(private utilisateurService: UtilisateurService, private router: Router, 
        private activatedRoute: ActivatedRoute) { };

    onLogout() {
        this.utilisateurService.logout();
        console.log(localStorage.getItem('token'));
        this.router.navigate(['/login']);
    }
}