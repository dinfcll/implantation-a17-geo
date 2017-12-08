import { Component, Input, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { PostPersoComponent } from '../postperso/postperso.component';

import { Comment } from '../../class/comment.class';
import { ProfilUtilisateur } from '../../class/profilutilisateur.class';
import { UserPost } from '../../class/post.class';

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
    comments: Comment[];
    commentTxt: string;
    currentPId: number;

    bLike: boolean = false;
    bModif: boolean = false;
    showPost: boolean = true;

    constructor(private http: Http, private router: Router, private userpostservice: UserPostService) {
        this.profil = new ProfilUtilisateur(-1,"","","","","");
        this.currentPId = Number(localStorage.getItem('profilId'));
    }

    ngOnInit() {
        this.http
        .get('api/comment/' + this.p.postId)
        .subscribe(res => { this.comments = res.json(); });

        this.http
        .get('api/profilbyid/' + this.p.profilId)
        .subscribe(res => { this.profil = res.json(); });
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
                    this.showPost = false;
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

    onAddComment() {
        this.userpostservice
        .addComment(this.commentTxt, this.p.postId, Number(localStorage.getItem('profilId')), 
            localStorage.getItem('username'))
        .subscribe(res => {
            if(res) {
                this.comments.unshift(res);
            }
        })
    }

    onDeleteComment(cId: number) {
        let confirmer: boolean = confirm("Voulez-vous vraiment supprimer ce commentaire?");
        if (confirmer) {
            this.comments.find(c => c.commentId == cId).commentShow = false;
            this.userpostservice
            .deleteComment(cId)
            .subscribe(res => {
                if(res.status == 200) {
                    new jBox('Notice', {
                        content: 'Le commentaire a ete supprime.', color: 'green', autoClose: 2000
                    });
                }
            });            
        } 
    }

    getName(profilId: string) {
        
    }
}
