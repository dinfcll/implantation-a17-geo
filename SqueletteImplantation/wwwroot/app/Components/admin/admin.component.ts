import { Component, OnInit } from '@angular/core';

import { Utilisateur } from './../../class/utilisateur.class'

import { UtilisateurService } from './../../services/utilisateur.service';

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    styleUrls:['./admin.component.css','./../../../lib/bootstrap/dist/css/bootstrap.css']
})
export class AdminComponent implements OnInit{
    
    utilisateur : Utilisateur;

    constructor(private utilisateurservice: UtilisateurService) { }
    
    ngOnInit(): void {
        this.utilisateur = new Utilisateur(null, this.utilisateurservice.loggedIn(), null, 0);
        this.utilisateurservice.getUser()
            .subscribe(res => {                
                if(res) { this.utilisateur = res; }
        });
    }
}