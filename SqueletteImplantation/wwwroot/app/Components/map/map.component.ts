import { Component, Input ,OnInit} from '@angular/core';
import { Http } from '@angular/http';

import { ConfigService } from "../utils/config.service";
import { Marqueur } from "../../class/marqueur.class";

declare var google: any;
declare var jBox:any;

@Component ({
    moduleId: module.id,
    selector: 'map',
    templateUrl:'./map.html',
    styleUrls:['./map.component.css','./../../../lib/bootstrap/dist/css/bootstrap.css']
})

export class MapComponent implements OnInit {

     name ='Map';
     private marqueurs:Marqueur[];
     public currentmarqueur:Marqueur;
     public map:any;
     public btnAjout:string;
     public AcceptMarker:boolean;
     public Longitude:number;
     public Latitude:number;
     public baseUrl: string = '';
     public banqueimageicone: Array<string>;
     public marqtemp: any;

    constructor(private http: Http) {
        this.getMarqueurs();
        this.btnAjout = "Ajout marqueur";
        this.AcceptMarker = false;
        this.banqueimageicone = ['../../../images/officiel_icone.svg',
                            '../../../images/user_icone.svg'];
        this.currentmarqueur = new Marqueur(0,"",0,0,"",1,"","");
        this.marqtemp = new google.maps.Marker ({
            icon: this.banqueimageicone[1],
            draggable: true,
        });
    }

    PermissionAjoutMarker():void{
        this.AcceptMarker = !this.AcceptMarker;
        if(this.btnAjout === "Ajouter un marqueur") {
            this.btnAjout = "Annuler";
        } else {
            this.btnAjout = "Ajout marqueur";
            this.marqtemp.setMap(null);
        }       
    }

    getMarqueurs(): void {
        this.http.get("api/marqueurs")
                .subscribe((resdata) => {
                    this.marqueurs = resdata.json() as Marqueur[];
                    this.marqueurs.forEach((mark) => {
                        this.AjoutMarker(mark);
                    });
                });
    }

    AjoutMarker (info: Marqueur) {
        var marker = new google.maps.Marker ({
            position: { lat:info.latitude,lng: info.longitude },
            map: this.map,
            icon: this.banqueimageicone[info.icone],
            title: info.nom
        });

        google.maps.InfoWindow.prototype.ouvert = false;
        var infoWindow = new google.maps.InfoWindow ({
            content:`<div class="iw-titre"
                <h2>`+info.nom+`</h2></div>
                <div *ngIf="info.desc">
                    `+info.desc+`
                </div>
            `
        });

        var chemin = new google.maps.Polyline ({
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 3,
            path: []
        });

        marker.addListener('click', () => {
            if(!infoWindow.ouvert) {
                this.map.setZoom(13);
                this.map.panTo(marker.position);
                infoWindow.open(this.map, marker);
                if(info.trajetlat != "" && info.trajetlat != null && info.trajetlng != "" && info.trajetlng != null) {
                    let chlat = info.trajetlat.split(",");
                    let chlng = info.trajetlng.split(",");

                    let path = chemin.getPath();
                    path.push(new google.maps.LatLng(info.latitude,info.longitude));
                    for(let i = 0; i < chlat.length; i++) {
                        path.push(new google.maps.LatLng(chlat[i], chlng[i]))
                    }
                }
                chemin.setMap(this.map);
                infoWindow.ouvert = true;
            } else {
                this.map.setZoom(10);
                infoWindow.close();
                chemin.setMap(null);
                infoWindow.ouvert = false;
            }
        });
    }
        
    CreationMaker(Gdonne:any) {

        if(this.AcceptMarker) {
            this.currentmarqueur.latitude = Gdonne.latLng.lat();
            this.currentmarqueur.longitude = Gdonne.latLng.lng();
            this.marqtemp.setPosition({lat: this.currentmarqueur.latitude, lng: this.currentmarqueur.longitude});
            this.marqtemp.setMap(null); 
            this.marqtemp.setMap(this.map);
        }
    }
    
    ConfirmationMarker(){
        if(this.currentmarqueur.latitude == 0)
        {
            new jBox('Notice', {
                content: 'Veuillez cliquer sur la map pour ajouter un marqueur',
                color: 'red',
                autoClose: 2000
            });
        }
        else {
            let marqposition = this.marqtemp.getPosition();
            this.currentmarqueur.latitude = marqposition.lat();
            this.currentmarqueur.longitude = marqposition.lng();
            this.http.post("api/marqueurs", this.currentmarqueur)
            .subscribe( res => {
                this.marqueurs.push(res.json() as Marqueur);
                this.PermissionAjoutMarker();
                this.AjoutMarker(this.currentmarqueur);
            });            
        }
    }

    ngOnInit() : void {
        var myCenter = { lat: 46.752560, lng: -71.228740 }; 
        var mapOptions = {
            zoom: 10,
            center: myCenter,
            mapTypeId: 'hybrid'
        }

        this.getMarqueurs();
        this.map = new google.maps.Map( document.getElementById('map'),mapOptions );
    
        //géolocation
        if( navigator.geolocation ) {
            navigator.geolocation.getCurrentPosition (( position ) => {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude   
                };
                
                var marker = new google.maps.Marker ({
                    position: pos,
                    map: this.map,
                    icon: '../../../images/ici_icone.svg'
                });
                
                this.map.setCenter(pos);
            }, function() {
                    alert("Géolocalisation refusée, position par defaut : Lévis");
                });
        }

        this.map.addListener('click', (e:any):void => {

                this.currentmarqueur.latitude=e.latLng.lat();
                this.currentmarqueur.longitude=e.latLng.lng();

                this.CreationMaker(e);                  
        });
    }         
}