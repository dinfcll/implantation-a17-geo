import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Utilisateur } from './../../class/utilisateur.class';
import { UtilisateurService } from './../../services/utilisateur.service';

@Component({
    selector: 'loginForm',
    templateUrl: './loginform.component.html',
    styleUrls: ['./loginform.component.css']
})

export class LoginFormComponent {

    private subscription: Subscription;
    binscription:boolean=false;
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

    toggleInscription() {
        this.binscription=true;
    }

    inscription(mail:string ,mdp:string, cmdp:string) {
            if(mdp != cmdp) {
                alert("Les mots de passe sont différents");
            }
            else {
                this.utilisateurService.signin(mail,mdp).subscribe(res => {
                    if(res) {
                        this.router.navigate(['/map']);
                    }
                    else {
                        alert("Il y a déjà un compte lié à ce courriel.")
                    }
                });
            }
    }
}
