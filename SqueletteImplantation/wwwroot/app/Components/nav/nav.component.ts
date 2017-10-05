import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UtilisateurService } from '../../services/utilisateur.service';

declare var jBox: any;

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
        this.router.navigate(['/login']);
    }

    onDeleteUser() {
        var email = localStorage.getItem('token');
        
        this.utilisateurService
            .deleteProfil(email)
            .subscribe(res => {
                if(res) {
                    new jBox('Notice', {
                        content: 'Votre profil a été supprimé.',
                        color: 'blue',
                        autoClose: 2000
                    });
                }
                else {
                    new jBox('Notice', {
                        content: 'An error occured on delete pofil.',
                        color: 'red',
                        autoClose: 2000
                    });
                }
            });

        this.utilisateurService
            .deleteUser(email)
            .subscribe(res => {
                if(res) {
                    new jBox('Notice', {
                        content: 'Votre compte a été supprimé.',
                        color: 'blue',
                        autoClose: 2000
                    });
                    this.router.navigate(['/login']);
                }
                else {
                    new jBox('Notice', {
                        content: 'An error occured on delete user.',
                        color: 'red',
                        autoClose: 2000
                    });
                }
            })
    }
}