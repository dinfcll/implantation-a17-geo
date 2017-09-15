import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Utilisateur } from '../../class/utilisateur.class';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
    selector: 'loginForm',
    templateUrl: './loginform.component.html',
    styleUrls: ['./loginform.component.css']
})

export class LoginFormComponent {

    errors: string;
    isRequesting: boolean;
    credentials: Utilisateur = { id: -1, email: '', mdp: '' };

    constructor(private utilisateurService: UtilisateurService, private router: Router, 
        private activatedRoute: ActivatedRoute) { }

    login( mail: string, mot: string) {
        this.isRequesting = true;
        this.errors = '';
        this.utilisateurService.login(mail, mot)
            .finally(() => this.isRequesting = false)
            .subscribe(
                result => {
                    if (result) {
                        this.router.navigate(['/map']);
                    }
                },
            error => this.errors = error);
    }
}