import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { ProfilUtilisateur } from '../class/profilutilisateur.class';
import { UserPost } from '../class/post.class';
import { Utilisateur } from '../class/utilisateur.class';

import { BaseService } from './base.service';
import { ConfigService } from './config.service';

import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class UtilisateurService extends BaseService {

    baseUrl: string = '';
    profil:ProfilUtilisateur;

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

    getProfilById(profilId:string){
        return this.http
        .get(
            this.baseUrl + '/profilbyid/' + profilId, profilId
        )
        .map(res => {
            return res.json();
        })
        .catch(this.handleError);
    }

    getProfil(courriel:string){
        return this.http
        .get(
            this.baseUrl + '/profil/'+courriel, courriel
        )
        .map(res => {
            return res.json();
        })
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

    editProfil(profilId: number, courriel: string, username: string, prenom: string, nom: string) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        console.log(JSON.stringify({ profilId, courriel, username, prenom, nom }), { headers });
        return this.http
            .put(this.baseUrl + '/profil/edit', 
                JSON.stringify({ profilId, courriel, username, prenom, nom }), { headers })
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

    getListPost() {
        return this.http
            .get(this.baseUrl + '/postUser')
            .map(res => { return res.json() })
            .catch(this.handleError);
    }

    createPost(postTitle: string, postText: string) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this.http
            .post(this.baseUrl + '/postUser/create', JSON.stringify({ postTitle, postText}), {headers})
            .map(res => {return res.json();})
            .catch(this.handleError);
    }

    modifyPost(p : UserPost) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this.http
            .put(this.baseUrl + '/postUser/modify', JSON.stringify({ p }), {headers})
            .map(res => {return res.json();})
            .catch(this.handleError);
    }

    likePost(postId : number) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this.http
            .post(this.baseUrl + '/postUser/like/' + postId, JSON.stringify({ postId }), {headers})
            .map(res => {return res.json();})
            .catch(this.handleError);
    }

    deletePost(postId: number) {
        return this.http
            .delete(this.baseUrl + '/postUser/delete/' + postId, JSON.stringify({ postId }))
            .map(res => {return res.json();})
            .catch(this.handleError);
    }
}
