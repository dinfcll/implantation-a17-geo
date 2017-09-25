import { Component, OnInit } from '@angular/core';

import { ProfilUtilisateur } from './../../class/profilutilisateur.class';

@Component({
    selector: 'profil-utilisateur',
    templateUrl: './profil-utilisateur.component.html'
})

export class ProfilUtilisateurComponent implements OnInit{
    
    profil: ProfilUtilisateur;    
    email: string; 

    ngOnInit(): void {
        this.profil = new ProfilUtilisateur(1,"a@a.a","Arthur99","Arthur","Audet");        
        this.email= localStorage.getItem('token');
    }
      

}
