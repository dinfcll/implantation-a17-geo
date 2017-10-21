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

    submit(postTitle: string, postText: string) {
        this.utilisateurservice
            .createpost(postTitle, postText)
            .subscribe(res => {
                if(res)
                    alert("ok");
                else
                    alert("pas ok");
             })
    }
}