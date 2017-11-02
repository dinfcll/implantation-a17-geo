import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router/';

import { UserPost } from '../../class/post.class';
import { UserPostService } from '../../services/userpost.service';

import { Observable } from 'rxjs';

declare var jBox :any;

@Component({
    selector: 'postUser',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css','./../../../lib/bootstrap/dist/css/bootstrap.css']
})

export class PostUserComponent implements OnInit {

    posts : UserPost[];
    bModif: boolean = false;
    bLike: boolean = false;
    selectedPost: UserPost;

    constructor(private userpostservice: UserPostService, private router: Router) { }

    ngOnInit() {
        this.onGetPosts();
    }

    onGetPosts() {
        this.userpostservice
            .getListPost()
            .subscribe(res => {
                this.posts = res;
                console.log(this.posts);
        });
    }

    submitPost(postTitle: string, postText: string) {
        this.userpostservice
            .createPost(postTitle, postText)
            .subscribe(res => {
                if(res) {
                    new jBox('Notice', { 
                        content: 'La publication est publiee.', color: 'green', autoClose: 2000 
                    });
                    this.router.navigate(['/postUser']);
                }
             })
    }

    onModifyBtn(p: UserPost){
        this.selectedPost = p;
    }

    onModifyPost(p : UserPost) {
        console.log(p);
        this.userpostservice
            .modifyPost(p)
            .subscribe(res => {
                if (res) {
                    new jBox('Notice', {
                        content: 'La publication a ete modifiee.',
                        color: 'green',
                        autoClose: 2000
                    });
                    this.selectedPost = null;
                    this.router.navigate(['/postUser']);
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
                    }
                });            
        }     
    }

    onLike(p : UserPost) {
        if(!this.bLike) {
            this.userpostservice
            .likePost(p.postId)
            .subscribe(res => {
                if(res)
                    p.postLike = res.postLike;
            })
        } else {
            this.userpostservice
            .unlikePost(p.postId)
            .subscribe(res => {
                if(res)
                    p.postLike = res.postLike;                    
            })
        }
        
        this.bLike = !this.bLike;
    }
}