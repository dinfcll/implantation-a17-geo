import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UtilisateurService } from './../../services/utilisateur.service';

import { Subscription } from 'rxjs';

declare var jBox :any;

@Component({
    selector: 'resetPW',
    templateUrl: './resetPW.component.html',
    styleUrls: ['./resetPW.component.css']
})

export class ResetPWComponent {

    constructor(private utilisateurService: UtilisateurService, private router: Router) { }

    resetPW(mdp:string, confirm:string) {
        if(mdp != confirm) {
            new jBox('Notice', {
                content: 'Les mots de passe sont différents.', color: 'yellow', autoClose: 2000
            });
        } else {
            var email = localStorage.getItem('token');

            this.utilisateurService
            .newPW(mdp, email)
            .subscribe(res => {
                if(res)
                    this.router.navigate(['/map']); 
                else {
                    new jBox('Notice', {
                        content: 'Un problème est survenu, veuillez essayer plus tard.',
                        color: 'red',
                        autoClose: 2000
                    });
                }
            });
        }  
    }
}
