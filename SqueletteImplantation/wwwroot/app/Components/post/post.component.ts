import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router/';

import { UserPost } from '../../class/post.class';
import { UserPostService } from '../../services/userpost.service';

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
    
    test: any;

    bLike: boolean = false;
    bModif: boolean = false;

    constructor(private userpostservice: UserPostService, private router: Router) { }

    ngOnInit() {
        this.onGetPosts();
        this.test = localStorage.getItem('Proimage');
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
            this.userpostservice
            .createPost(postTitle, postText)
            .subscribe(res => {
                if(res) {
                    new jBox('Notice', { 
                        content: 'La publication est publiee.', color: 'green', autoClose: 2000 
                    });
                }
            })
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
                        content: 'La publication a ete modifiee.',
                        color: 'green',
                        autoClose: 2000
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
                            content: 'La publication a ete supprimee.', 
                            color: 'green', autoClose: 2000
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
                }
            })
        } else {           
            this.userpostservice
            .unlikePost(p.postId)
            .subscribe(res => {
                if(res) {
                    p.postLike = res.postLike; 
                    this.selectedLike = null;
                }                
            })
        }
        
        this.bLike = !this.bLike;
    }
}