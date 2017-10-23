import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router/';

import { UserPost } from '../../class/post.class';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
    selector: 'postUser',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css','./../../../lib/bootstrap/dist/css/bootstrap.css']
})

export class PostUserComponent implements OnInit {

    posts : any[] = [];
    bModif: boolean = false;
    userpost : UserPost;

    constructor(private utilisateurservice: UtilisateurService, private router: Router) { }

    ngOnInit(): void {
        this.utilisateurservice
            .getListPost()
            .subscribe(res => {
                this.posts = res;
                console.log(this.posts);
            });
    }

    submitPost(postTitle: string, postText: string) {
        this.utilisateurservice
            .createPost(postTitle, postText)
            .subscribe(res => {
                if(res)
                    window.location.reload()
             })
    }

    onModifyBtn(){
        this.bModif = !this.bModif;
    }

    onModifyPost(p : UserPost) {
        console.log(p);
        this.utilisateurservice
            .modifyPost(p)
            .subscribe(res => {
                if(res)
                    console.log(res);
            })
    }

    onDeletePost(p : UserPost) {
        this.utilisateurservice
            .deletePost(p.postId)
            .subscribe(res => {
                if(res.status == 200)
                    window.location.reload()
            })
    }

    onLike(p : UserPost) {
        this.utilisateurservice
            .likePost(p.postId)
            .subscribe(res => {
                if(res)
                    p.postLike = res.postLike;
            })
    }
}