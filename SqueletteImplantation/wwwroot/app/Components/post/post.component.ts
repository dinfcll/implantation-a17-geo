import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router/';

import { ProfilUtilisateur } from '../../class/profilutilisateur.class';
import { UserPost } from '../../class/post.class';

import { UserPostService } from '../../services/userpost.service';
import { UtilisateurService } from '../../services/utilisateur.service';

declare var jBox :any;

@Component({
    selector: 'postUser',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css','./../../../lib/bootstrap/dist/css/bootstrap.css']
})

export class PostUserComponent implements OnInit {

    posts: UserPost[];
    selectedPost: UserPost;
    selectedLike: UserPost;

    profil: ProfilUtilisateur;
    postSubmit: string;

    bLike: boolean = false;
    bModif: boolean = false;

    constructor(private router: Router, private userpostservice: UserPostService, 
        private utilisateurservice: UtilisateurService) { }

    ngOnInit() {
        this.onGetPosts();
        this.utilisateurservice
        .getProfil(localStorage.getItem('token'))
        .subscribe(res => {
            if(res)
                this.profil = res;
        });
    }

    onGetPosts() {
        this.userpostservice
        .getListPost()
        .subscribe(res => {
            this.posts = res;
        });
    }

    submitPost(postTitle: string, postText: string) {
        if(!postTitle || !postText) {
            new jBox('Notice', { 
                content: 'Entrer un titre et un texte.', color: 'red', autoClose: 2000 
            });
        } else {
            if(this.profil) {
                this.userpostservice
                .createPost(postTitle, postText, this.profil.profilId, this.postSubmit)
                .subscribe(res => {
                    if(res) {
                        new jBox('Notice', { 
                            content: 'La publication est publiee.', color: 'green', autoClose: 2000 
                        });
                    }
                })
            } else {
                new jBox('Notice', { 
                    content: 'Veuillez creer un profil.', color: 'red', autoClose: 2000 
                });
            }   
        }       
    }

    OnPreLoadImage(event: any) {
        let files: FileList;
        files = event.target.files;
        if (files && files[0]) {
            if (files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
                let fr = new FileReader();
                fr.onload = (e: any) => {
                    this.postSubmit = e.target.result;
                };
                fr.readAsDataURL(files[0]);
            }
        }
    }

    onModifyBtn(p: UserPost){
        this.selectedPost = p;
    }

    cancelModifyBtn() {
        this.selectedPost = null;
    }

    onModifyPost(p : UserPost) {
        console.log(p);
        this.userpostservice
        .modifyPost(p)
        .subscribe(res => {
            if (res) {
                this.selectedPost = null;
                new jBox('Notice', {
                    content: 'La publication a ete modifiee.', color: 'green', autoClose: 2000
                });
            }
        });
    }

    onDeletePost(p : UserPost) {
        let confirmer: boolean = confirm("Voulez-vous vraiment supprimer cette publication?");
        if (confirmer) {
            this.userpostservice
            .deletePost(p.postId)
            .subscribe(res => {
                if(res.status == 200) {
                    new jBox('Notice', {
                        content: 'La publication a ete supprimee.', color: 'green', autoClose: 2000
                    });
                    this.router.navigate(['/postUser']);
                }
            });            
        }     
    }

    onLike(p : UserPost) {        
        if(!this.bLike) {
            this.userpostservice
            .likePost(p.postId)
            .subscribe(res => {
                if(res) {
                    p.postLike = res.postLike;
                    this.selectedLike = p;
                    this.bLike = true;
                }
            })
        } else {
            if (p.postLike > 0) {  
                this.userpostservice
                .unlikePost(p.postId)
                .subscribe(res => {
                    if(res) {
                        p.postLike = res.postLike; 
                        this.selectedLike = null;
                        this.bLike = false;
                    }                
                })
            } else {
                this.selectedLike = null;
                this.bLike = false;
            }
        }
    }
}