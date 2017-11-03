import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { ProfilUtilisateur } from '../class/profilutilisateur.class';
import { Utilisateur } from '../class/utilisateur.class';

import { BaseService } from './base.service';
import { ConfigService } from './config.service';

import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class BuddyService extends BaseService {

    
    Followed:ProfilUtilisateur[];
    Follower:ProfilUtilisateur[];
    UnknownUsers:ProfilUtilisateur[];

    constructor(private http: Http, private configService: ConfigService) {
        super();
    }
    init(){
        this.Followed=new Array<ProfilUtilisateur>();
        this.Follower=new Array<ProfilUtilisateur>();
        this.UnknownUsers=new Array<ProfilUtilisateur>();
    }
    getFollowed(){
        this.http
        .get("/api/following/getFollowedById/"+localStorage.getItem("profilId"))
        .subscribe(res =>{
            this.Followed=res.json() as ProfilUtilisateur[];
        })
    }
    getFollower(){
        this.http
        .get("/api/following/getFollowerById/"+localStorage.getItem("profilId"))
        .subscribe(res =>{
            this.Follower=res.json() as ProfilUtilisateur[];
        })
    }
    getUnknownUsers(){
        this.http
        .get("/api/profil")
        .subscribe(res =>{
            this.UnknownUsers=this.array_diff(res.json() as ProfilUtilisateur[],this.Followed);
            console.log(this.UnknownUsers);
        })
    }
    array_diff(arr1:ProfilUtilisateur[], arr2:ProfilUtilisateur[]){
        var temp_arr = [];
        for(var i=0; i<arr1.length; i++){
            if(arr2.indexOf(arr1[i]) == -1){  
                temp_arr.push(arr1[i]);
            }
        }
        return temp_arr;
    }
    searchUsers(q:string){
        return this.http
        .get("/api/following/searchUser/"+q);
    }
    follow(user:ProfilUtilisateur){
        return this.http
        .post("/api/following/follow/"+localStorage.getItem("profilId")+"/"+user.profilId,null);
    }
    unfollow(user:ProfilUtilisateur){
        return this.http
        .post("/api/following/unfollow/"+localStorage.getItem("profilId")+"/"+user.profilId,null);
    }
    resetSuggestion(){
        this.UnknownUsers=this.array_diff(this.UnknownUsers,this.Followed);
    }
   
}
