import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router/';

import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
    selector: 'postUser',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css','./../../../lib/bootstrap/dist/css/bootstrap.css']
})

export class PostUserComponent implements OnInit {

    constructor(private utilisateurservice: UtilisateurService, private router: Router) { }

    ngOnInit(): void {
        this.utilisateurservice
            .getListPost()
            .subscribe(res => { });
    }

    submit(postTitle: string, postText: string) {
        this.utilisateurservice
            .createpost(postTitle, postText)
            .subscribe(res => { })
    }
}