import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Utilisateur } from './../../class/utilisateur.class';
import { UtilisateurService } from './../../services/utilisateur.service';

declare var jBox: any;

@Component({
    selector: 'loginForm',
    templateUrl: './loginform.component.html',
    styleUrls: ['./loginform.component.css']
})

export class LoginFormComponent {

    binscription: boolean = false;
    utilisateur: Utilisateur;
    option: string;

    constructor(private utilisateurService: UtilisateurService, private router: Router) {

    }
    formSubmit(option:any,email:string,mdp:string,confirm:string){
        if(this.option=="signin" || this.option==undefined){
            this.onLogin(email,mdp);
        }
        else if(this.option=="signup")
            {
                this.inscription(email,mdp,confirm);
            }
            else if(this.option=="reset")
                {
                    this.resetPW(email);
                }
    }
    onLogin(email: string, mdp: string) {
        this.utilisateurService
        .login(email, mdp)
        .subscribe( res => {
            if (res) {
                localStorage.setItem('token', res.email);
                localStorage.setItem('bAdmin', res.typeutil);
                this.utilisateurService.getProfil(res.email)
                .subscribe(respro => {
                    if (respro) {
                        this.utilisateurService.profil = respro;
                        localStorage.setItem('profilId', respro.profilId);
                        localStorage.setItem('username', respro.username);
                        localStorage.setItem('Proimage', respro.profilimage);
                    } else {
                        localStorage.setItem('profilId', "");
                        localStorage.setItem('username', "");
                        localStorage.setItem('Proimage', "");
                    }
                    if (res.reset) {
                        this.router.navigate(['/resetPW']);
                    } else {
                        this.router.navigate(['/map']);
                    }
                });
            } else {
                new jBox('Notice', {
                    content: 'Courriel ou mot de passe invalide',
                    color: 'red',
                    autoClose: 2000
                });
            }
        });
    }

    resetPW(email: string) {
        this.utilisateurService.reset(email)
        .subscribe(res => {
            if (res === false) {
                new jBox('Notice', {
                        content: 'Un problème est survenu, veuillez essayer plus tard.',
                        color: 'red',
                        autoClose: 2000
                });
            } else {
                new jBox('Notice', {
                    content: 'Si un compte a été trouvé, un courriel a été envoyé.',
                    color: 'blue',
                    autoClose: 2000
                });
            }
        });
    }

    inscription(mail: string, mdp: string, cmdp: string) {
        if (mdp != cmdp) {
            new jBox('Notice', {
                content: 'Les mots de passe sont différents.',
                color: 'red',
                autoClose: 2000
              });
        } else {
            this.utilisateurService
            .signin(mail, mdp)
            .subscribe(res => {
                if (res) {
                    localStorage.setItem('token', mail);
                    localStorage.setItem('bAdmin', '0');
                    localStorage.setItem('profilId', "");
                    localStorage.setItem('username', "");
                    localStorage.setItem('Proimage', "");
                    this.router.navigate(['/map']);
                } else {
                    if (res === false) {
                        new jBox('Notice', {
                            content: 'Un problème est survenu lors de l\'envoi du courriel de bienvenue, <br>' +
                            'mais vous pouvez quand même utiliser le site.',
                            color: 'red',
                            autoClose: false
                        });
                        localStorage.setItem('token', mail);
                        localStorage.setItem('bAdmin', '0');
                        localStorage.setItem('profilId', "");
                        localStorage.setItem('username', "");
                        localStorage.setItem('Proimage', "");
                        this.router.navigate(['/map']);
                    } else {
                        if (res == null) {
                            new jBox('Notice', {
                                content: 'Il y a déjà un compte à ce courriel.',
                                color: 'red',
                                autoClose: 2000
                            });
                        }
                    }
                }
            });
        }
    }
}
