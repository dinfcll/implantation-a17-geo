import { Component, OnInit } from '@angular/core';

import { ProfilUtilisateur } from './../../class/profilutilisateur.class';
import { UtilisateurService } from '../../services/utilisateur.service';


@Component({
    selector: 'profil-utilisateur',
    templateUrl: './profil-utilisateur.component.html'
})

export class ProfilUtilisateurComponent implements OnInit{

    profil: ProfilUtilisateur;
    email: string;
    constructor( private utilisateurservice: UtilisateurService ) {

    }

    ngOnInit(): void {
        // this.profil = new ProfilUtilisateur(1,"a@a.a","Arthur99","Arthur","Audet");        
        this.email = this.utilisateurservice.loggedIn();
        this.getProfil();
    }

    getProfil() {
        this.utilisateurservice
        .getProfil()
        .subscribe(res => {
            if(res) {
                this.profil = res;
            } else {
                alert('pas de profil trouvé pour cet utilisateur');
            }
        });
    }
}
