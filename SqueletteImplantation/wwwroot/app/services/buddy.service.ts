import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { ProfilUtilisateur } from '../class/profilutilisateur.class';
import { Utilisateur } from '../class/utilisateur.class';

import { BaseService } from './base.service';
import { ConfigService } from './config.service';

import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class BuddyService extends BaseService {
    Followed:ProfilUtilisateur[];
    Follower:ProfilUtilisateur[];
    UserNotFollowed:ProfilUtilisateur[];

    constructor(private configService: ConfigService, private http: Http) {
        super();
    }

    init() {
        this.Followed=new Array<ProfilUtilisateur>();
        this.Follower=new Array<ProfilUtilisateur>();
        this.UserNotFollowed=new Array<ProfilUtilisateur>();
    }

    getFollowed() {
        this.http
            .get("/api/following/getFollowedById/" + localStorage.getItem("profilId"))
            .subscribe(res => { this.Followed=res.json() as ProfilUtilisateur[]; })
    }

    getFollower() {
        this.http
            .get("/api/following/getFollowerById/" + localStorage.getItem("profilId"))
            .subscribe(res => { this.Follower=res.json() as ProfilUtilisateur[]; })
    }

    getUserNotFollowed() {
        this.http
            .get("/api/following/getSuggestionById/"+ localStorage.getItem("profilId"))
            .subscribe(res => {
                this.UserNotFollowed = res.json() as ProfilUtilisateur[];
            });
    }
    searchUsers(query:string) {
        return this.http.get("/api/following/searchUser/" + query);
    }

    follow(user:ProfilUtilisateur) {
        return this.http.post("/api/following/follow/" + 
            localStorage.getItem("profilId") + "/" + user.profilId, null);
    }

    unfollow(user:ProfilUtilisateur) {
        return this.http.post("/api/following/unfollow/" + 
            localStorage.getItem("profilId") + "/" + user.profilId, null);
    }
};
