import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Utilisateur } from './../../class/utilisateur.class';
import { ProfilUtilisateur } from '../../class/profilutilisateur.class';
import { UserPost } from '../../class/post.class';

import { UtilisateurService } from './../../services/utilisateur.service';
import { UserPostService } from './../../services/userpost.service';

declare var jBox: any;

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css', './../../../lib/bootstrap/dist/css/bootstrap.css']
})
export class AdminComponent implements OnInit {

    utilisateurs: Utilisateur[];
    profils: ProfilUtilisateur[];
    userposts: UserPost[];
    typeutilisateur: String[];

    constructor(private utilisateurservice: UtilisateurService, private userpostservice: UserPostService, private router: Router) {
        this.typeutilisateur = ['Utilisateur', 'Administrateur'];
    }

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
        this.userpostservice.getListPost()
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
                    this.deleteProfil(res);
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
                    let index = this.utilisateurs.indexOf(u);
                    this.utilisateurs.splice(index, 1);
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

    deleteProfil(p: ProfilUtilisateur) {
        this.utilisateurservice.deleteProfil(p.profilId)
        .subscribe(res => {
            if (res.status === 200) {
                new jBox('Notice', {
                    content: 'Suppression du profil réussie',
                    color: 'green',
                    autoClose: 5000
                });
                let index = this.profils.indexOf(p);
                this.profils.splice(index, 1);
            } else {
                new jBox('Notice', {
                    content: 'Impossible de supprimer le profil pour cet utilisateur',
                    color: 'red',
                    autoClose: 5000
                });
            }
        });
    }

    deleteUserPost(postId: number) {
        alert(postId + 'WORK IN PROGRESS');
    }

    modifTypeUtil(u: Utilisateur) {
        if (u.typeutil === 1) {
            u.typeutil = 0;
        } else {
            u.typeutil = 1;
        }

        this.utilisateurservice.modifTypeUtil(u.id, u.typeutil)
        .subscribe(res => {
            if (res) {
                new jBox('Notice', {
                    content: 'Modification du type d\'utilisateur réussie',
                    color: 'green',
                    autoClose: 5000
                });
                let index = this.utilisateurs.indexOf(u);
                this.utilisateurs[index].typeutil = res.typeutil;
                console.log(this.utilisateurs[index]);
            } else {
                new jBox('Notice', {
                    content: 'Impossible de modifier le type d\'utilisateur pour cet utilisateur',
                    color: 'red',
                    autoClose: 5000
                });
            }
        });
    }
}
