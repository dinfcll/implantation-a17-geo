import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router/";

import { ProfilUtilisateur } from './../../class/profilutilisateur.class';
import { UtilisateurService } from '../../services/utilisateur.service';

declare var jBox :any;

@Component({
    selector: 'profil-utilisateur',
    templateUrl: './profil-utilisateur.component.html'
})

export class ProfilUtilisateurComponent implements OnInit{

    profil: ProfilUtilisateur;
    email: string;
    constructor( private utilisateurservice: UtilisateurService, private router: Router ) {

    }

    ngOnInit(): void {
        this.profil = new ProfilUtilisateur(null,this.utilisateurservice.loggedIn(),"","","");        
        this.email = this.utilisateurservice.loggedIn();
        this.onGetProfil();
    }

    onGetProfil() {
        this.utilisateurservice
        .getProfil()
        .subscribe(res => {
            if(res) {
                this.profil = res;
            } else {                
                new jBox('Notice', {
                content: 'Aucun profil trouvé. Vous pouvez en créer un',
                color: 'red',
                autoClose: 2000
              });                
            }
        });
    }

    onCreateProfil(){
        this.utilisateurservice
        .createProfil(this.profil.courriel, this.profil.username, this.profil.prenom, this.profil.nom)
        .subscribe(res => {
            if(res) {
                this.profil = res;
                this.router.navigate(['/profil'])
                new jBox('Notice', {
                content: 'Création de profil réussie',
                color: 'green',
                autoClose: 5000
                });
            } else {
                new jBox('Notice', {
                content: 'impossible de créer un profil pour cet utilisateur ou le profil existe déjà',
                color: 'red',
                autoClose: 5000
              }); 
            }
        });
    }

    onEditProfil() {
        this.utilisateurservice
        .editProfil(this.profil)
        .subscribe(res => {
            if(res) {
                var profilETutil = res;
                this.profil = profilETutil[0];
                this.email = profilETutil[1].email;
                localStorage.setItem('token', this.email);
            } else {
                new jBox('Notice', {
                    content: 'impossible de modifier le profil pour cet utilisateur',
                    color: 'red',
                    autoClose: 5000
                });
            }
        });
    }
}
