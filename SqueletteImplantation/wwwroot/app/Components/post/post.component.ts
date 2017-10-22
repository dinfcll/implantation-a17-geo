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
                    alert("ok");
                else
                    alert("pas ok");
             })
    }

    onModifyPost(postTitle: string, postText: string, postId: number) {
        this.utilisateurservice
            .modifyPost(postTitle, postText, postId)
            .subscribe(res => {
                if(res)
                    alert("yeah modif");
                else
                    alert("pas yeah modif");
            })
    }

    onDeletePost(postId: number) {
        this.utilisateurservice
            .deletePost(postId)
            .subscribe(res => {
                if(res.status == 200)
                    alert("it's done son");
                else
                    alert("pas deleter dsl");
            })
    }
}