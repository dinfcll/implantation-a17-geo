import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router/";

import { ProfilUtilisateur } from './../../class/profilutilisateur.class';
import { UtilisateurService } from '../../services/utilisateur.service';
import { Utilisateur } from '../../class/utilisateur.class';

declare var jBox :any;

@Component({
    selector: 'profil-utilisateur',
    templateUrl: './profil-utilisateur.component.html',
    styleUrls:['./profil-utilisateur.component.css','./../../../lib/bootstrap/dist/css/bootstrap.css']
})

export class ProfilUtilisateurComponent implements OnInit{

    profil: ProfilUtilisateur;    
    bEdit: boolean = false;
    user: Utilisateur;

    constructor( private utilisateurservice: UtilisateurService, private router: Router ) { }

    ngOnInit(): void {
        this.profil = new ProfilUtilisateur(null,this.utilisateurservice.loggedIn(),"","","");
        this.onGetProfil();
        this.user = new Utilisateur(null, this.utilisateurservice.loggedIn(), null);
        this.onGetUser();
    }

    onGetProfil() {
        this.utilisateurservice
        .getProfil(this.utilisateurservice.loggedIn())
        .subscribe(res => {
            if(res) {
                this.profil = res;
            } else {                
                new jBox('Notice', {
                    content: 'Aucun profil trouvé. Vous pouvez en créer un',
                    color: 'red',
                    autoClose: 5000
                });                
            }
        });
    }

    onGetUser() {
        this.utilisateurservice.getUser()
            .subscribe(res => {
                if(res) { this.user = res }
        });
    }

    onCreateProfil(){
        this.utilisateurservice
        .createProfil(this.profil.courriel, this.profil.username, this.profil.prenom, this.profil.nom)
        .subscribe(res => {
            if(res) {
                
                this.profil = res;
                localStorage.setItem('profilId', res.profilId);
                localStorage.setItem('username', res.username);
                this.router.navigate(['/profil'])
                new jBox('Notice', {
                    content: 'Création du profil réussie',
                    color: 'green',
                    autoClose: 5000
                });
            } else {
                new jBox('Notice', {
                    content: 'Impossible de créer un profil pour cet utilisateur ou le profil existe déjà',
                    color: 'red',
                    autoClose: 5000
                });
            }
        });
    }

    editActif(){
        this.bEdit = true;
    }

    onEditProfil() {
        this.utilisateurservice
        .editProfil(this.profil.profilId, this.profil.courriel, this.profil.username, this.profil.prenom, this.profil.nom)
        .subscribe(res => {
            if(res) {
                this.profil = res;                
                localStorage.setItem('token', this.profil.courriel);
                this.bEdit = false;
                new jBox('Notice', {
                    content: 'Édition du profil réussie',
                    color: 'green',
                    autoClose: 5000
                });
            } else {
                new jBox('Notice', {
                    content: 'Impossible de modifier le profil pour cet utilisateur',
                    color: 'red',
                    autoClose: 5000
                });
            }
        });
    }

    onDeleteProfil() {       
        var confirmation: boolean = false
        confirmation = confirm("Voulez vous supprimer votre profil?")
        if (confirmation) {            
            this.supprimerProfile();
        }       
    }

    supprimerProfile() {
        this.utilisateurservice.deleteProfil(this.profil.profilId)
        .subscribe(res => {
            if(res.status == 200) {                    
                this.profil = new ProfilUtilisateur(null,this.utilisateurservice.loggedIn(),"","","");                    
                new jBox('Notice', {
                    content: 'Suppression du profil réussie',
                    color: 'green',
                    autoClose: 5000
                });
            } else {
                new jBox('Notice', {
                    content: 'Impossible de supprimer le profil pour cet utilisateur',
                    color: 'red',
                    autoClose: 5000
                });
            }
        });
    }

    onDeleteUser() {
        var confirmation: boolean = false
        confirmation = confirm("Voulez vous vraiment supprimer votre compte?")
        if(confirmation) {
            this.supprimerProfile()
            this.utilisateurservice.deleteUser(this.user.id)
                .subscribe(res => {
                        if(res.status == 200) {                                     
                            new jBox('Notice', {
                                content: 'Suppression de l\'utilisateur réussie',
                                color: 'green',
                                autoClose: 5000
                            });
                            this.utilisateurservice.logout();
                            this.router.navigate(['/login']);
                        } else {
                            new jBox('Notice', {
                                content: 'Impossible de supprimer l\'utilisateur',
                                color: 'red',
                                autoClose: 5000
                            });
                        }
                });
        }
    }
}
