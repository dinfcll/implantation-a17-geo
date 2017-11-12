import { Component, Input } from '@angular/core';

import { ProfilUtilisateur } from '../../class/profilutilisateur.class';
import { UserPost } from '../../class/post.class';

import { UserPostService } from '../../services/userpost.service';

declare var jBox :any;

@Component({
    selector: 'postUser',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css','./../../../lib/bootstrap/dist/css/bootstrap.css']
})

export class PostUserComponent {

    @Input() p: UserPost;

    bLike: boolean = false;
    bModif: boolean = false;

    constructor(private userpostservice: UserPostService) { }

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
                    new jBox('Notice', {
                        content: 'La publication a ete supprimee.', color: 'green', autoClose: 2000
                    });
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
