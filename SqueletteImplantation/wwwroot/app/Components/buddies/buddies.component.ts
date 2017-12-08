import { Component, Input, OnInit, ChangeDetectorRef, Output,EventEmitter  } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { Marqueur } from "../../class/marqueur.class";
import { ProfilUtilisateur } from './../../class/profilutilisateur.class';
import { Utilisateur } from './../../class/utilisateur.class';

import { BuddyService } from './../../services/buddy.service';
import { ConfigService } from "../../services/config.service";
import { UtilisateurService } from './../../services/utilisateur.service';


declare var jBox:any;

@Component ({
    moduleId: module.id,
    selector: 'buddies',
    templateUrl:'./buddies.html',
    styleUrls:['./buddies.component.css','./../../../lib/bootstrap/dist/css/bootstrap.css']
})

export class BuddiesComponent implements OnInit {

     @Output() previewEvent= new EventEmitter<ProfilUtilisateur>();
     @Output() updateEvent= new EventEmitter();
     name ='Buddies';
     searchResult: ProfilUtilisateur[];
     
    constructor(private utilisateurService: UtilisateurService, private router: Router, 
        private buddyService :BuddyService) { }

    ngOnInit() {
        this.buddyService.init();
        this.buddyService.getFollowed();
        this.buddyService.getFollower();
    }
    userPreview(profil:ProfilUtilisateur)
    {
        this.previewEvent.next(profil);
    }
    searchUser(search:string) {
        this.buddyService.searchUsers(search)
        .subscribe(res => {
            this.searchResult=res.json() as ProfilUtilisateur[] ;
        }) 
    }

    follow(user:ProfilUtilisateur) {
        this.buddyService.follow(user)
        .subscribe(res=> {
            if(res.json() == true) {
                this.buddyService.Followed.push(user);
                var index=this.buddyService.UserNotFollowed.indexOf(user);
                if(index >=0){
                    this.buddyService.UserNotFollowed.splice(index,1);
                }
                this.updateEvent.next();
            } else {
                new jBox('Notice', {
                    content: 'Vous suivez déjà cet utilisateur',
                    color: 'red',
                    autoClose: 2000
                });
            }            
        });
    }

    unfollow(user: ProfilUtilisateur) {
        this.buddyService.unfollow(user)
        .subscribe(res => {
            if(res) {
                var index=this.buddyService.Followed.indexOf(user);
                this.buddyService.Followed.splice(index,1);
                this.buddyService.UserNotFollowed.push(user);
                this.updateEvent.next();
            }           
        });
    }    
}
