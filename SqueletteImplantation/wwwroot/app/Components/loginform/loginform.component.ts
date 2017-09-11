import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Utilisateur } from '../../class/utilisateur.class';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
    selector: 'loginForm',
    templateUrl: './loginform.component.html',
    styleUrls: ['./loginform.component.css']
})

export class LoginFormComponent implements OnInit {

    private subscription: Subscription;

    brandNew: boolean;
    errors: string;
    isRequesting: boolean;
    credentials: Utilisateur = { id: -1, email: '', mdp: '' };

    constructor(private utilisateurService: UtilisateurService, private router: Router, private activatedRoute: ActivatedRoute) { }
    ngOnInit() { 
        this.subscription = this.activatedRoute.queryParams.subscribe(
            (param: any) => {
                this.brandNew = param['brandNew'];
                this.credentials.email = param['email'];
            });
     }

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