import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UtilisateurService } from '../../services/utilisateur.service';

declare var jBox: any;

@Component({
    selector: 'navBar',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})

export class NavBarComponent {
    public username :string;

    constructor(private utilisateurService: UtilisateurService, private router: Router, 
        private activatedRoute: ActivatedRoute) { };
    
    ngOnInit(): void {
        this.username=localStorage.getItem("username");
    }

    onLogout() {
        this.utilisateurService.logout();
        this.router.navigate(['/login']);
    }
}