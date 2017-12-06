import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router/';

import { ProfilUtilisateur } from './../../class/profilutilisateur.class';
import { Utilisateur } from '../../class/utilisateur.class';

import { UtilisateurService } from '../../services/utilisateur.service';

declare var jBox: any;

@Component({
    selector: 'profil-utilisateur',
    templateUrl: './profil-utilisateur.component.html',
    styleUrls: ['./profil-utilisateur.component.css', './../../../lib/bootstrap/dist/css/bootstrap.css']
})

export class ProfilUtilisateurComponent implements OnInit {

    profil: ProfilUtilisateur;
    bEdit: boolean = false;
    user: Utilisateur;
    imageDefaut: string = '../../../images/hiker.jpg';

    constructor(private utilisateurservice: UtilisateurService, private router: Router) { }

    ngOnInit(): void {
        this.profil = new ProfilUtilisateur(-1, this.utilisateurservice.loggedIn(), '', '', '', this.imageDefaut);
        this.onGetProfil();
        this.user = new Utilisateur(null, this.utilisateurservice.loggedIn(), null, 0);
        this.onGetUser();
    }

    onGetProfil() {
        this.utilisateurservice
        .getProfil(this.utilisateurservice.loggedIn())
        .subscribe(res => {
            if (res) {
                this.profil = res;
                if (this.profil.profilimage == null) {
                    this.profil.profilimage = this.imageDefaut;
                }
            } else {
                new jBox('Notice', {
                    content: 'Aucun profil trouvé. Vous pouvez en créer un',
                    color: 'red',
                    autoClose: 2000
                });
            }
        });
    }

    onGetUser() {
        this.utilisateurservice.getUser()
        .subscribe(res => {
            if (res) { this.user = res; }
        });
    }

    onCreateProfil() {
        this.utilisateurservice
        .createProfil(this.profil.courriel, this.profil.username, this.profil.prenom, this.profil.nom, this.profil.profilimage)
        .subscribe(res => {
            if (res) {
                this.profil = res;
                localStorage.setItem('profilId', res.profilId);
                localStorage.setItem('username', res.username);
                localStorage.setItem('Proimage', this.profil.profilimage);
                this.router.navigate(['/profil']);
                new jBox('Notice', {
                    content: 'Création du profil réussie',
                    color: 'green',
                    autoClose: 2000
                });
            } else {
                new jBox('Notice', {
                    content: 'Impossible de créer un profil pour cet utilisateur ou le profil existe déjà',
                    color: 'red',
                    autoClose: 2000
                });
            }
        });
    }

    editToogle() {
        this.bEdit = !this.bEdit;
    }

    editAnnuler() {
        this.onGetProfil();
        this.editToogle();
    }

    onEditProfil() {
        this.utilisateurservice
        .editProfil(this.profil.profilId, this.profil.courriel, this.profil.username, this.profil.prenom, this.profil.nom, this.profil.profilimage)
        .subscribe(res => {
            if (res) {
                this.profil = res;
                localStorage.setItem('token', this.profil.courriel);
                localStorage.setItem('username', this.profil.username);
                localStorage.setItem('Proimage', this.profil.profilimage);
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
        let confirmation: boolean;
        confirmation = false;
        confirmation = confirm('Voulez vous supprimer votre profil?');
        if (confirmation) {
            this.supprimerProfile();
        }
    }

    supprimerProfile() {
        this.utilisateurservice.deleteProfil(this.profil.profilId)
        .subscribe(res => {
            if (res.status === 200) {
                this.profil = new ProfilUtilisateur(-1, this.utilisateurservice.loggedIn(), '', '', '', this.imageDefaut);
                localStorage.setItem('username', '');
                localStorage.setItem('Proimage', this.imageDefaut);
                localStorage.setItem('profilId', '');
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
        let confirmation: boolean;
        confirmation = false;
        confirmation = confirm('Voulez vous vraiment supprimer votre compte?');
        if (confirmation) {
            this.supprimerProfile();
            this.utilisateurservice.deleteUser(this.user.id)
            .subscribe(res => {
                if (res.status === 200) {
                    new jBox('Notice', {
                        content: 'Suppression de l\'utilisateur réussie', color: 'green', autoClose: 2000
                    });
                    this.utilisateurservice.logout();
                    this.router.navigate(['/login']);
                } else {
                    new jBox('Notice', {
                        content: 'Impossible de supprimer l\'utilisateur', color: 'red', autoClose: 2000
                    });
                }
            });
        }
    }

    OnPreLoadImage(event: any) {
        let files: FileList;
        files = event.target.files;
        if (files && files[0]) {
            if (files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
                let fr = new FileReader();
                fr.onload = (e: any) => {
                    this.profil.profilimage = e.target.result;
                };
                fr.readAsDataURL(files[0]);
            } else {
                new jBox('Notice', {
                    content: 'veuillez entrer une image',
                    color: 'red',
                    autoClose: 2000
                });
            }
        }
    }
}
