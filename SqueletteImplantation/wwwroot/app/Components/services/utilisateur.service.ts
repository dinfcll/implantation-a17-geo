import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Utilisateur } from '../models/utilisateur.class';
import { ConfigService } from '../utils/config.service';

import { BaseService } from './base.service';

import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class UtilisateurService extends BaseService {

    baseUrl: string = '';

    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    authNavStatus$ = this._authNavStatusSource.asObservable();

    private loggedIn = false;

    constructor(private http: Http, private configService: ConfigService) {
        super();
        this.baseUrl = configService.getApiURI();
    }

    login(email: string, mdp: string) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');

        return this.http
            .post(
                this.baseUrl + 'utilisateur/login',
                JSON.stringify({ email, mdp }), { headers }
            )
            .map(res => res.json())
            .map(res => {
                this.loggedIn = true;
                this._authNavStatusSource.next(true);
                return true;
            })
            .catch(this.handleError);
    }

    logout() {
        this.loggedIn = false;
        this._authNavStatusSource.next(false);
    }

    isLoggedIn() {
        return this.loggedIn;
    }
}