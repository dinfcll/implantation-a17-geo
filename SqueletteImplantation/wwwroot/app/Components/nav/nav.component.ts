import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
    selector: 'navBar',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})

export class NavBarComponent {

    public username: string;

    constructor(private utilisateurService: UtilisateurService, private router: Router) { };
    
    ngOnInit(): void {
        this.username = localStorage.getItem("username");
    }

    onLogout() {
        this.utilisateurService.logout();
        this.router.navigate(['/login']);
    }
}