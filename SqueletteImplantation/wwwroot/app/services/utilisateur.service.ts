import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { ProfilUtilisateur } from '../class/profilutilisateur.class';

import { BaseService } from './base.service';
import { ConfigService } from './config.service';
import { LoadingService } from './loading.service';

@Injectable()
export class UtilisateurService extends BaseService {

    baseUrl: string = '';
    profil: ProfilUtilisateur;

    constructor(private configService: ConfigService, private http: Http, private loadingService: LoadingService) {
        super();
        this.baseUrl = configService.getApiURI();
    }

    login(email: string, mdp: string) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');

        this.loadingService.startLoadLocal();

        return this.http
            .post(this.baseUrl + '/utilisateur/login', JSON.stringify({ email, mdp }), { headers })
            .map(res => {
                this.loadingService.stopLoadLocal();
                return res.json();
            })
            .catch(this.handleError);
    }

    getUsername() {
        return localStorage.getItem('username');
    }

    getProimage() {
        return localStorage.getItem('Proimage');
    }

    loggedIn() {
        return localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('bAdmin');
    }

    newPW(mdp: string, email: string) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');

        this.loadingService.startLoadLocal();

        return this.http
            .post(this.baseUrl + '/utilisateur/newpw', JSON.stringify({ email, mdp }), { headers })
            .map(res => {
                this.loadingService.stopLoadLocal();
                return res.json();
            })
            .catch(this.handleError);
    }

    reset(email: string) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');

        this.loadingService.startLoadLocal();

        return this.http
            .post(this.baseUrl + '/utilisateur/reset', JSON.stringify({ email }), { headers })
            .map(res => {
                this.loadingService.stopLoadLocal();
                return res.json();
            })
            .catch(this.handleError);
    }

    signin(email: string, mdp: string) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');

        this.loadingService.startLoadLocal();

        return this.http
            .post(this.baseUrl + '/utilisateur/signin',
                JSON.stringify({ email, mdp }), { headers })
            .map(res => {
                this.loadingService.stopLoadLocal();
                return res.json();
            })
            .catch(this.handleError);
    }

    getProfilById(profilId: string) {
        return this.http
            .get(this.baseUrl + '/profilbyid/' + profilId, profilId)
            .map(res => { return res.json(); })
            .catch(this.handleError);
    }

    getProfil(courriel: string) {
        return this.http
            .get(this.baseUrl + '/profil/' + courriel, courriel)
            .map(res => { return res.json(); })
            .catch(this.handleError);
    }

    getAllProfil() {
        return this.http
            .get(this.baseUrl + '/profil')
            .map(res => { return res.json(); })
            .catch(this.handleError);
    }

    createProfil(courriel: string, username: string, prenom: string, nom: string, profilimage: string) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');

        this.loadingService.startLoadLocal();

        return this.http
            .post(this.baseUrl + '/profil/create', JSON.stringify({ courriel, username,
                prenom, nom, profilimage }), { headers })
            .map(res => {
                this.loadingService.stopLoadLocal();
                return res.json();
            })
            .catch(this.handleError);
    }

    editProfil(profilId: number, courriel: string, username: string, prenom: string, nom: string, profilimage: string) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');

        this.loadingService.startLoadLocal();

        return this.http
            .put(this.baseUrl + '/profil/edit', JSON.stringify({ profilId, courriel,
                username, prenom, nom, profilimage }), { headers })
            .map(res => {
                this.loadingService.stopLoadLocal();
                return res.json(); })
            .catch(this.handleError);
    }

    deleteProfil(id: number) {
        return this.http
            .delete(this.baseUrl + '/profil/delete/' + id, JSON.stringify({ id }))
            .map(res => { return res; })
            .catch(this.handleError);
    }

    getUser() {
        return this.http
            .get(this.baseUrl + '/utilisateur/' + this.loggedIn())
            .map(res => { return res.json(); })
            .catch(this.handleError);
    }

    getAllUser() {
        return this.http
            .get(this.baseUrl + '/utilisateur')
            .map(res => { return res.json(); })
            .catch(this.handleError);
    }

    deleteUser(id: number) {
        return this.http
            .delete(this.baseUrl + '/utilisateur/delete/' + id, JSON.stringify({ id }))
            .map(res => { return res; })
            .catch(this.handleError);
    }

    estAdmin() {
        return localStorage.getItem('bAdmin');
    }

    modifTypeUtil(id: number, typeutil: number) {
        return this.http
            .put(this.baseUrl + '/utilisateur/modiftypeutil/' + id + '/' + typeutil,
                JSON.stringify({ id, typeutil}))
            .map(res => { return res.json(); })
            .catch(this.handleError);
    }
}
