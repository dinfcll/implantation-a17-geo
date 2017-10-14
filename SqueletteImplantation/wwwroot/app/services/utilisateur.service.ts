import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { ProfilUtilisateur } from '../class/profilutilisateur.class';
import { Utilisateur } from '../class/utilisateur.class';

import { BaseService } from './base.service';
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
            .post(this.baseUrl + '/utilisateur/login', JSON.stringify({ email, mdp }), { headers })
            .map(res => { return res.json() })
            .catch(this.handleError);
    }

    loggedIn() {
        return localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
    }

    newPW(mdp: string, email: string) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');

        return this.http
            .post(this.baseUrl + '/utilisateur/newpw', JSON.stringify({ email,mdp }), { headers }) 
            .map(res => { return res.json() })
            .catch(this.handleError);
    }

    reset(email: string) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');

        return this.http
            .post(this.baseUrl + '/utilisateur/reset', JSON.stringify({ email }), { headers }) 
            .map(res => { return res.json() })
            .catch(this.handleError);    
    }

    signin(email: string, mdp: string) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');

        return this.http
            .post(this.baseUrl + '/utilisateur/signin',
                JSON.stringify({ email, mdp }), { headers })
            .map(res => { return res.json() })
            .catch(this.handleError);
    }

    getProfil() {
        return this.http
            .get(this.baseUrl + '/profil/' + this.loggedIn(), this.loggedIn())
            .map(res => { return res.json() })
            .catch(this.handleError);
    }

    createProfil(courriel: string, username: string, prenom: string, nom: string) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        
        return this.http
        .post(this.baseUrl + '/profil/create', 
            JSON.stringify({ courriel, username, prenom, nom }), { headers })
        .map(res => { return res.json() })
        .catch(this.handleError);
    }

    editProfil(id: number, courriel: string, username: string, prenom: string, nom: string) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        
        return this.http
            .put(this.baseUrl + '/profil/edit', 
                JSON.stringify({ id, courriel, username, prenom, nom }), { headers })
            .map(res => { return res.json() })
            .catch(this.handleError);
    }

    deleteProfil(id: number) {        
        return this.http
            .delete(this.baseUrl + '/profil/delete/' + id, JSON.stringify({ id }))
            .map(res => { return res })
            .catch(this.handleError);
    }

    getUser() {
        return this.http
            .get(this.baseUrl + '/utilisateur/'+ this.loggedIn())
            .map(res => { return res.json() })
            .catch(this.handleError);
    }

    deleteUser(id: number) {
        return this.http
            .delete(this.baseUrl + '/utilisateur/delete/' + id, JSON.stringify({ id }))
            .map(res => { return res })
            .catch(this.handleError);
    }
}
