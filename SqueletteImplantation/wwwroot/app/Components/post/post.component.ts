import { Component, Input, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { PostPersoComponent } from '../postperso/postperso.component';

import { ProfilUtilisateur } from '../../class/profilutilisateur.class';
import { UserPost } from '../../class/post.class';

import { UtilisateurService } from '../../services/utilisateur.service';
import { UserPostService } from '../../services/userpost.service';

declare var jBox :any;

@Component({
    selector: 'postUser',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css','./../../../lib/bootstrap/dist/css/bootstrap.css']
})

export class PostUserComponent implements OnInit{

    @Input() p: UserPost;
    profil : ProfilUtilisateur;

    bLike: boolean = false;
    bModif: boolean = false;

    constructor(private http: Http, private userpostservice: UserPostService, private router: Router) {
        this.profil = new ProfilUtilisateur(-1,"","","","","");
    }

    ngOnInit() {
        this.http
        .get('api/profilbyid/' + this.p.profilId)
        .subscribe(res => { this.profil = res.json(); })
    }

    onModifyBtn() {
        this.bModif = !this.bModif;
    }

    onModifyPost(p : UserPost) {
        this.userpostservice
        .modifyPost(p)
        .subscribe(res => {
            if (res) {
                new jBox('Notice', {
                    content: 'La publication a ete modifiee.', color: 'green', autoClose: 2000
                });
                this.bModif = !this.bModif;
            }
        });
    }

    onDeletePost() {
        let confirmer: boolean = confirm("Voulez-vous vraiment supprimer cette publication?");
        if (confirmer) {
            this.userpostservice
            .deletePost(this.p.postId)
            .subscribe(res => {
                if(res.status == 200) {
                    /*************/
                }
            });            
        }     
    }

    onLike() { 
        if(!this.bLike) {
            this.userpostservice
            .likePost(this.p.postId)
            .subscribe(res => {
                if(res) {
                    this.p.postLike = res.postLike;
                }
            })
        } else { 
            this.userpostservice
            .unlikePost(this.p.postId)
            .subscribe(res => {
                if(res) {
                    this.p.postLike = res.postLike; 
                }                
            })
        }  
        
        this.bLike = !this.bLike;
    }
}
