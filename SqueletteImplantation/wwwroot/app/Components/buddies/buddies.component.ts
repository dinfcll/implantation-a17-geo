import { Component, Input ,OnInit,ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { ConfigService } from "../../services/config.service";
import { Marqueur } from "../../class/marqueur.class";
import { Utilisateur } from './../../class/utilisateur.class';

import { BuddyService } from './../../services/buddy.service';
import { ProfilUtilisateur } from './../../class/profilutilisateur.class';

import { UtilisateurService } from './../../services/utilisateur.service';

declare var google: any;
declare var jBox:any;

@Component ({
    moduleId: module.id,
    selector: 'buddies',
    templateUrl:'./buddies.html',
    styleUrls:['./buddies.component.css','./../../../lib/bootstrap/dist/css/bootstrap.css']
})

export class BuddiesComponent implements OnInit {
     name ='Buddies';
     searchResult: ProfilUtilisateur[];
     

     constructor(private utilisateurService: UtilisateurService, private router: Router, 
        private activatedRoute: ActivatedRoute , private buddyService :BuddyService) { }

     ngOnInit(){
        this.buddyService.init();
         this.buddyService.getFollowed();
         this.buddyService.getFollower();
         this.buddyService.getUnknownUsers();
     }
     searchUser(search:string){
         this.buddyService.searchUsers(search)
            .subscribe(res =>{
                this.searchResult=res.json() as ProfilUtilisateur[] ;
            }) 
     }
     follow(user:ProfilUtilisateur){
         this.buddyService.follow(user)
         .subscribe(res=>{
             if(res.json()==true)
                {
                    console.log("follow"+user.username);
                    this.buddyService.Followed.push(user);
                    this.buddyService.resetSuggestion();
                }
                else{
                    new jBox('Notice', {
                        content: 'Vous suivez déjà cet utilisateur',
                        color: 'red',
                        autoClose: 2000
                    });
                }
            
         });
     }
     unfollow(user:ProfilUtilisateur){
        this.buddyService.unfollow(user)
        .subscribe(res=>{
           if(res)
            {
                console.log("unfollow"+user.username);
                var index=this.buddyService.Followed.indexOf(user);
                this.buddyService.Followed.splice(index,1);
                this.buddyService.resetSuggestion();
            }
           
        });
    }
    
}
