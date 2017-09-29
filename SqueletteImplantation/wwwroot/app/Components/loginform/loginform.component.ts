import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Utilisateur } from './../../class/utilisateur.class';
import { UtilisateurService } from './../../services/utilisateur.service';

import { Subscription } from 'rxjs';
declare var jBox :any;

@Component({
    selector: 'loginForm',
    templateUrl: './loginform.component.html',
    styleUrls: ['./loginform.component.css']
})

export class LoginFormComponent {

    binscription: boolean = false;
    utilisateur: Utilisateur;

    constructor(private utilisateurService: UtilisateurService, private router: Router, 
        private activatedRoute: ActivatedRoute) { }

    onLogin(email: string, mdp: string) { 
        this.utilisateurService
        .login(email, mdp)
        .subscribe( res => {          
            if(res){
                if(res.reset)
                {
                    localStorage.setItem('token', res.email);
                    this.router.navigate(['/resetPW']); 
                }
                else{
                    localStorage.setItem('token', res.email);
                    this.router.navigate(['/map']); 
                }
            } else
                new jBox('Notice', {
                    content: 'Courriel ou mot de passe invalide',
                    color: 'red',
                    autoClose: 2000
                });
        });

    }

    resetPW(email:string){
        this.utilisateurService.reset(email)
        .subscribe(res =>{
            if(res){
                new jBox('Notice', {
                    content: 'Si un compte a été trouvé,un courriel a été envoyé',
                    color: 'blue',
                    autoClose: 2000
                  });
            }
            else{
                new jBox('Notice', {
                    content: 'Un problème est survenue , veuillez essayer plus tard',
                    color: 'red',
                    autoClose: 2000
                });
            }
            
        });
    }
    inscription(mail: string, mdp: string, cmdp: string) {
        if(mdp != cmdp)
            new jBox('Notice', {
                content: 'Les mots de passe sont differents',
                color: 'yellow',
                autoClose: 2000
              });
        else {            
            this.utilisateurService
                .signin(mail, mdp)
                .subscribe(res => {
                    if(res) {
                        localStorage.setItem('token', mail);
                        this.router.navigate(['/map']);
                    } else
                    if(res==false){
                        new jBox('Notice', {
                            content: 'Un problème est survenue , veuillez essayer plus tard',
                            color: 'red',
                            autoClose: 2000
                        });
                    }
                    else
                        if(res==null){
                            new jBox('Notice', {
                                content: 'Il y a déjà un compte a ce courriel',
                                color: 'red',
                                autoClose: 2000
                            });
                        }
                        
            });
        }}
}
