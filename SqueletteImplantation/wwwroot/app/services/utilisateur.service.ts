import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { BaseService } from './base.service';
import { Utilisateur } from '../class/utilisateur.class';
import { ConfigService } from '../Components/utils/config.service';

import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class UtilisateurService extends BaseService {

    baseUrl: string = '';

    constructor(private http: Http, private configService: ConfigService) {
        super();
        this.baseUrl = configService.getApiURI();
    }

    login(email: string, mdp: string) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');

        return this.http
            .post(
                this.baseUrl + '/utilisateur/login',
                JSON.stringify({ email, mdp }), { headers }
            )
            .map(res => {
                return res.json()
                
            })
            .catch(this.handleError);           
    }

    loggedIn() {
        return tokenNotExpired;        
    }

    logout() {
        localStorage.removeItem('id_token');
    }

    signin(email: string, mdp: string) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');

        return this.http
            .post(
                this.baseUrl + '/utilisateur/signin',
                JSON.stringify({ email, mdp }), { headers }
            ) 
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }
}