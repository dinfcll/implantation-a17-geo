import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Utilisateur } from './../../class/utilisateur.class';
import { ProfilUtilisateur } from '../../class/profilutilisateur.class';
import { UserPost } from '../../class/post.class';

import { UtilisateurService } from './../../services/utilisateur.service';

declare var jBox: any;

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    styleUrls:['./admin.component.css', './../../../lib/bootstrap/dist/css/bootstrap.css']
})
export class AdminComponent implements OnInit {

    utilisateurs: Utilisateur[];
    profils: ProfilUtilisateur[];
    userposts: UserPost[];

    constructor(private utilisateurservice: UtilisateurService, private router: Router) { }

    ngOnInit(): void {
        this.getAllUser();
        this.getAllProfil();
        this.getAllUserPost();        
    }

    getAllUser() {
        this.utilisateurservice.getAllUser()
        .subscribe(res => {
            if (res) {
                 this.utilisateurs = res;
            }
        });
    }

    getAllProfil() {
        this.utilisateurservice.getAllProfil()
        .subscribe(res => {
            if (res) {
                 this.profils = res;
            }
        });
    }

    getAllUserPost() {
        this.utilisateurservice.getListPost()
        .subscribe(res => {
            if (res) {
                 this.userposts = res;
            }
        });
    }

    deleteUser(u: Utilisateur) {
        let confirmation: boolean;
        confirmation = false;
        confirmation = confirm('Voulez vous vraiment supprimer ce compte?');
        if (confirmation) {
            this.utilisateurservice
            .getProfil(u.email)
            .subscribe(res => {
                console.log(res);
                if (res) {
                    this.deleteProfil(res.profilId);
                } 
            });
            this.utilisateurservice.deleteUser(u.id)
            .subscribe(res => {
                if (res.status === 200) {
                    new jBox('Notice', {
                        content: 'Suppression de l\'utilisateur réussie',
                        color: 'green',
                        autoClose: 5000
                    });
                    this.getAllUser();
                    this.router.navigate(['/admin']);
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

    deleteProfil(profilId: number) {
        this.utilisateurservice.deleteProfil(profilId)
        .subscribe(res => {
            if (res.status === 200) {
                    new jBox('Notice', {
                    content: 'Suppression du profil réussie',
                    color: 'green',
                    autoClose: 5000
                });
                this.getAllProfil();
            } else {
                new jBox('Notice', {
                    content: 'Impossible de supprimer le profil pour cet utilisateur',
                    color: 'red',
                    autoClose: 5000
                });
            }
        });
    }

    deleteUserPost(postId:number) {
        alert(postId + "WORK IN PROGRESS");
    }
}
