import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router/';

import { UserPost } from '../../class/post.class';
import { UserPostService } from '../../services/userpost.service';

import { Observable } from 'rxjs';

@Component({
    selector: 'postUser',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css','./../../../lib/bootstrap/dist/css/bootstrap.css']
})

export class PostUserComponent implements OnInit {

    posts : UserPost[];
    bModif: boolean = false;
    bLike: boolean = false;

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
                if(res)
                    this.posts.concat(res);
             })
    }

    onModifyBtn(){
        this.bModif = !this.bModif;
    }

    onModifyPost(p : UserPost) {
        console.log(p);
        this.userpostservice
            .modifyPost(p)
            .subscribe(res => {
                if(res) {
                    p.postTitle = res.postTitle;
                    p.postText = res.postText;
                }
            })
    }

    onDeletePost(p : UserPost) {
        this.userpostservice
            .deletePost(p.postId)
            .subscribe(res => {})
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