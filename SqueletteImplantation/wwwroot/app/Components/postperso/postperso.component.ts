import { Component, OnInit } from '@angular/core';

import { ProfilUtilisateur } from '../../class/profilutilisateur.class';
import { UserPost } from '../../class/post.class';

import { UserPostService } from '../../services/userpost.service';
import { UtilisateurService } from '../../services/utilisateur.service';

declare var jBox: any;

@Component({
    selector: 'postPerso',
    templateUrl: './postperso.component.html',
    styleUrls: [
        '../../post/post.component.css',
        './../../../lib/bootstrap/dist/css/bootstrap.css'
    ]
})

export class PostPersoComponent implements OnInit {

    followedPosts: UserPost[];
    isLoggedUser: boolean;
    posts: UserPost[];
    postSubmit: string;
    profil: ProfilUtilisateur;
    selectedProfil : ProfilUtilisateur;

    constructor(private userpostservice: UserPostService, private utilisateurservice: UtilisateurService) { 
        this.profil = new ProfilUtilisateur(-1,"","","","","");
        this.selectedProfil = null;
        this.isLoggedUser = true;
    }

    ngOnInit() {
        this.utilisateurservice.getProfil(localStorage.getItem('token'))
        .subscribe(res => {
            if(res)
                this.profil = res;
        });

        this.userpostservice.getFollowedPosts()
        .subscribe(res => {
            this.followedPosts = res;
        })

        this.userpostservice.getmyPosts()
        .subscribe(res => {
            this.posts = res;
        });      
    }

    updatePosts() {
        if(this.isLoggedUser ==true){
            this.userpostservice.getmyPosts()
            .subscribe(res => {
                this.posts = res;
            })
            this.userpostservice.getFollowedPosts()
            .subscribe(res => {
                this.followedPosts = res;
            })  
        }
    }

    submitPost(postTitle: string, postText: string) {
        if(!postTitle || !postText) {
            new jBox('Notice', { 
                content: 'Entrez un titre et un texte.', color: 'red', autoClose: 2000 
            });
        } else {
            if(this.profil) {
                this.userpostservice
                .createPost(postTitle, postText, this.profil.profilId)
                .subscribe(res => {
                    if(res) {
                        this.posts.unshift(res);
                        this.followedPosts.unshift(res);            
                    } else {
                        new jBox('Notice', { 
                        content: 'Veuillez créer un profil.', color: 'red', autoClose: 2000 
                        });
                    }   
                })
            }
        }       
    }

    viewMyProfil() {
        this.selectedProfil = null;
        this.isLoggedUser = true;
        this.updatePosts();
    }

    userPreview(profil: any) {
        this.selectedProfil = profil;
        this.userpostservice.getProImageByID(profil.profilId)
        .subscribe(res => {
            this.selectedProfil.profilimage=res;
        });
        this.userpostservice.getIdPosts(this.selectedProfil.profilId)
        .subscribe(res => {
            this.posts = res;
            this.isLoggedUser=false;
        });    
    }
}