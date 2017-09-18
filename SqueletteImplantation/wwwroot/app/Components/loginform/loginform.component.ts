import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Utilisateur } from './../../class/utilisateur.class';
import { UtilisateurService } from './../../services/utilisateur.service';

import { Subscription } from 'rxjs';

@Component({
    selector: 'loginForm',
    templateUrl: './loginform.component.html',
    styleUrls: ['./loginform.component.css']
})

export class LoginFormComponent {

    binscription: boolean = false;
    utilisateur: Utilisateur;

    constructor(private utilisateurService: UtilisateurService, private router: Router, 
        private activatedRoute: ActivatedRoute,) { }

    onLogin(mail:string ,mdp:string) {
        this.utilisateurService.login(mail, mdp);
    }

    toggleInscription() {
        this.binscription = true;
    }

    inscription(mail:string ,mdp:string, cmdp:string) {
        if(mdp != cmdp) 
            alert("Les mots de passe sont différents");
        else {
            this.utilisateurService
                .signin(mail,mdp)
                .subscribe(res => {
                    if(res) 
                        this.router.navigate(['/map']);
                    else 
                        alert("Il y a déjà un compte lié à ce courriel.")
            });
        }}
}
