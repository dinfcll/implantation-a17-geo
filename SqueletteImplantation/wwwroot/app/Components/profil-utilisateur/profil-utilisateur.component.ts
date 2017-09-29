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
    
    constructor( private utilisateurservice: UtilisateurService ) { }

    ngOnInit(): void {
        this.profil = new ProfilUtilisateur(null,this.utilisateurservice.loggedIn(),null,
        null,null);        
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
