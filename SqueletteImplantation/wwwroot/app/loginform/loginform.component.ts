import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-loginForm',
    templateUrl: './loginform.component.html',
    styleUrls: ['./loginform.component.css']
})

export class LoginFormComponent implements OnInit {
    constructor(private router:Router) { }
    ngOnInit() { }

    loginUser(e:any) {
        e.preventDefault();
        var email = e.target.element[0].value;
        var mdp = e.target.element[1].value;

        if(email == 'admin' && mdp == 'admin') {
            this.router.navigate(['map']);
        }
    }
}