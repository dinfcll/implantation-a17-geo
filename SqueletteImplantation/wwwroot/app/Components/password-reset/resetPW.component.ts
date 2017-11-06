import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UtilisateurService } from './../../services/utilisateur.service';

import { Subscription } from 'rxjs';

declare var jBox :any;

@Component({
    selector: 'resetPW',
    templateUrl: './resetPW.component.html',
    styleUrls: ['./resetPW.component.css']
})

export class ResetPWComponent {

    constructor(private utilisateurService: UtilisateurService, private router: Router, 
        private activatedRoute: ActivatedRoute) { }

    resetPW(mdp:string, confirm:string) {
        if(mdp != confirm) {
            new jBox('Notice', {
                content: 'Les mots de passe sont differents',
                color: 'yellow',
                autoClose: 2000
            });
        } else {
            var email = localStorage.getItem('token');

            this.utilisateurService.newPW(mdp, email)
                .subscribe(res => {
                    if(res)
                        this.router.navigate(['/map']); 
                    else {
                        new jBox('Notice', {
                            content: 'Un problème est survenue , veuillez essayer plus tard',
                            color: 'red',
                            autoClose: 2000
                        });
                    }
                });
        }  
    }
}
