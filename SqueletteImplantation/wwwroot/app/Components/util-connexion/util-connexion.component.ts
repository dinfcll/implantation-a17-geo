import { Component } from '@angular/core';

import { Http } from '@angular/http';

import { Utilisateur } from '../models/utilisateur.class';

@Component({
  selector: 'util-connexion',
  templateUrl:'./../view/util-connexion.component.html'
})

export class UtilConnexionComponent{
  private utilisateur: Utilisateur[];

  constructor(private http:Http){
    //this.getUtilisateur();
  };

  /*getUtilisateur() : void{
    this.http.get('api/Utilisateur')
      .subscribe(donnees => this.utilisateur + donnees.json() as Utilisateur[]);
  }*/
}