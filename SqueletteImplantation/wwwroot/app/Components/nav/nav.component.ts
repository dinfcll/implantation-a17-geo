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
    
<<<<<<< HEAD
    ngOnInit(): void {
        this.username=localStorage.getItem("username");
    }
=======
>>>>>>> 8b31fad0a1636abea04f41ae87f5851532574396

    onLogout() {
        this.utilisateurService.logout();
        this.router.navigate(['/login']);
    }
}